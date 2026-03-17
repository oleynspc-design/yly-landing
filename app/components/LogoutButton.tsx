"use client";

import { useState } from "react";

interface LogoutButtonProps {
  label?: string;
  className?: string;
}

export default function LogoutButton({
  label = "Wyloguj się",
  className = "inline-flex items-center justify-center rounded-xl bg-white/5 px-5 py-3 text-sm font-semibold text-white transition-all hover:bg-white/10 border border-white/10"
}: LogoutButtonProps) {
  const [loading, setLoading] = useState(false);

  const handleLogout = async () => {
    setLoading(true);

    try {
      await fetch("/api/auth/logout", {
        method: "POST",
      });
    } finally {
      window.location.href = "/";
    }
  };

  return (
    <button
      type="button"
      onClick={handleLogout}
      disabled={loading}
      className={className}
    >
      {loading ? "Wylogowywanie..." : label}
    </button>
  );
}
