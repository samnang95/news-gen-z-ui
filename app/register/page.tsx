"use client";
import { useState } from "react";
import { registerUser } from "@/services/api";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    try {
      const res = await registerUser({ username, email, password });
      const data = await res.json();
      if (!res.ok) {
        setError(data.message || "Failed to register");
        return;
      }
      router.push("/login?registered=true");
    } catch (err) {
      setError("An unexpected error occurred.");
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-6 relative overflow-hidden">
      <div className="absolute inset-0 bg-linear-to-tr from-emerald-900/20 to-teal-900/20 pointer-events-none" />
      <div className="absolute left-0 top-1/4 w-96 h-96 bg-emerald-600/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute right-0 bottom-1/4 w-96 h-96 bg-teal-600/20 rounded-full blur-[120px] pointer-events-none" />

      <div className="w-full max-w-md relative z-10">
        <div className="text-center mb-10">
          <Link href="/" className="text-3xl font-black tracking-tighter bg-linear-to-r from-emerald-400 to-teal-500 bg-clip-text text-transparent inline-block mb-2 drop-shadow-[0_0_10px_rgba(52,211,153,0.5)]">
            GEN·Z NEWS
          </Link>
          <h1 className="text-2xl font-bold text-white mt-2">Join the Shift</h1>
          <p className="text-zinc-400 mt-2">Create an account to get the full story</p>
        </div>

        <form onSubmit={handleRegister} className="bg-zinc-900/60 backdrop-blur-2xl border border-white/10 p-8 rounded-[2.5rem] shadow-[0_0_50px_rgba(52,211,153,0.15)] flex flex-col gap-6">
          {error && <div className="p-4 bg-red-500/10 border border-red-500/50 text-red-400 rounded-2xl text-sm font-medium text-center shadow-[0_0_15px_rgba(239,68,68,0.2)]">{error}</div>}

          <div>
            <label className="block text-zinc-400 text-sm font-semibold mb-2 ml-2 tracking-wide uppercase">Username</label>
            <input 
              type="text" 
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full bg-black/50 border border-white/5 rounded-[1.5rem] px-6 py-4 text-white focus:outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/50 transition-all placeholder:text-zinc-600 hover:border-white/10 shadow-inner"
              placeholder="neo_journalist"
            />
          </div>

          <div>
            <label className="block text-zinc-400 text-sm font-semibold mb-2 ml-2 tracking-wide uppercase">Email</label>
            <input 
              type="email" 
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-black/50 border border-white/5 rounded-[1.5rem] px-6 py-4 text-white focus:outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/50 transition-all placeholder:text-zinc-600 hover:border-white/10 shadow-inner"
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label className="block text-zinc-400 text-sm font-semibold mb-2 ml-2 tracking-wide uppercase">Password</label>
            <input 
              type="password" 
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-black/50 border border-white/5 rounded-[1.5rem] px-6 py-4 text-white focus:outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/50 transition-all placeholder:text-zinc-600 hover:border-white/10 shadow-inner"
              placeholder="••••••••"
            />
          </div>

          <button 
            type="submit"
            className="w-full bg-linear-to-r from-emerald-600 to-teal-600 text-white font-bold py-4 rounded-[1.5rem] mt-4 hover:opacity-90 hover:scale-[1.02] active:scale-95 transition-all shadow-[0_0_20px_rgba(52,211,153,0.4)] hover:shadow-[0_0_30px_rgba(52,211,153,0.6)]"
          >
            Sign Up
          </button>
          
          <p className="text-center text-zinc-400 text-sm mt-2">
            Already registered? <Link href="/login" className="text-emerald-400 hover:text-emerald-300 font-bold transition-colors">Sign in</Link>
          </p>
        </form>
      </div>
    </div>
  );
}
