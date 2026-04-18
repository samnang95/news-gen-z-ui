"use client";
import { useEffect } from "react";

export default function Logout() {
  useEffect(() => {
    // Clear the token cookie so the user is logged out system-wide
    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    localStorage.removeItem("token");
    window.location.href = "/"; // Force a full manual reload to clear server boundaries
  }, []);

  return (
    <div className="min-h-screen bg-black flex justify-center items-center">
      <div className="inline-flex items-center gap-4 px-6 py-3 rounded-full border border-purple-500/30 bg-purple-500/10 text-xl font-bold text-white shadow-[0_0_20px_rgba(168,85,247,0.3)] duration-700 animate-pulse">
        Signing out securely...
      </div>
    </div>
  );
}
