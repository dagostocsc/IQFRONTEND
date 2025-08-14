import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./ForgotPassword.css";

const API_ORIGIN = import.meta.env.VITE_API_ORIGIN || "http://localhost:8080";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!email) return;
    try {
      setLoading(true);
      await fetch(`${API_ORIGIN}/api/auth/forgot`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      setSent(true); // generic success regardless
    } finally {
      setLoading(false);
    }
  };

  if (sent) {
    return (
      <div className="auth-card">
        <h1>Check your email</h1>
        <p>If an account exists for <b>{email}</b>, you’ll receive a reset link.</p>
      </div>
    );
  }

  return (
    <div className="auth-card">
      <h1>Forgot Password</h1>
      <form onSubmit={onSubmit}>
        <input
          type="email"
          placeholder="Email address"
          autoComplete="email"
          value={email}
          onChange={(e)=>setEmail(e.target.value)}
          required
        />
        <button disabled={loading} type="submit">
          {loading ? "Sending..." : "Send reset link"}
        </button>
      </form>
    </div>
  );
}
