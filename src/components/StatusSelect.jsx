import { useState, useRef, useEffect } from "react";
import "./Status.css";

const STATUSES = [
  { value: "online",  label: "Online",  color: "#00e38a", icon: "" },
  { value: "busy",    label: "Idle",    color: "#ffb020", icon: "" },
  { value: "offline", label: "Invisible", color: "#8a8f98", icon: "" },
];

export default function StatusSelect({ value, onChange }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const close = (e) => { if (!ref.current?.contains(e.target)) setOpen(false); };
    document.addEventListener("pointerdown", close);
    return () => document.removeEventListener("pointerdown", close);
  }, []); 

  const cur = STATUSES.find(s => s.value === value) || STATUSES[0];

  return (
    <div className="status-select" ref={ref}>
      <button
        type="button"
        className="status-trigger"
        onClick={() => setOpen(o => !o)}
        aria-haspopup="listbox"
        aria-expanded={open}
      >
        <span className="dot" style={{ background: cur.color }} />
        {cur.icon} {cur.label}
        <span className="chev">▾</span>
      </button>

      {open && (
        <ul className="status-menu" role="listbox">
          {STATUSES.map(s => (
            <li
              key={s.value}
              role="option"
              aria-selected={s.value === value}
              className={`status-opt ${s.value === value ? "selected" : ""}`}
              onClick={() => { onChange(s.value); setOpen(false); }}
            >
              <span className="dot" style={{ background: s.color }} />
              {s.icon} {s.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
