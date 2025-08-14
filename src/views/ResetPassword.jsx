import React, { useMemo, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

const API_ORIGIN = import.meta.env.VITE_API_ORIGIN || "http://localhost:8080";

export default function ResetPassword() {
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const token = params.get("token") || "";
  const email = params.get("email") || "";

  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [loading, setLoading] = useState(false);
  const disabled = useMemo(() => !password || password !== confirm, [password, confirm]);

  const onSubmit = async (e) => {
    e.preventDefault();
    if (disabled) return;
    try {
      setLoading(true);
      const res = await fetch(`${API_ORIGIN}/api/auth/reset`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, token, password }),
      });
      const data = await res.json().catch(()=>({}));
      if (!res.ok) throw new Error(data?.error || "Reset failed");
      alert("Password updated. Please log in.");
      navigate("/login", { replace: true });
    } catch (err) {
      alert(err.message || "Reset failed.");
    } finally {
      setLoading(false);
    }
  };

  if (!token || !email) {
    return <div className="auth-card"><p>Invalid reset link.</p></div>;
  }

  return (
    <div className="auth-card">
      <h1>Set a new password</h1>
      <form onSubmit={onSubmit}>
        <input
          type="password"
          placeholder="New password (min 8 chars)"
          value={password}
          onChange={(e)=>setPassword(e.target.value)}
          minLength={8}
          required
        />
        <input
          type="password"
          placeholder="Confirm password"
          value={confirm}
          onChange={(e)=>setConfirm(e.target.value)}
          minLength={8}
          required
        />
        <button disabled={loading || disabled} type="submit">
          {loading ? "Updating..." : "Update password"}
        </button>
      </form>
    </div>
  );
}
