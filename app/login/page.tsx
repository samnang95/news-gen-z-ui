"use client";
import { useState } from "react";
import { loginUser } from "@/services/api";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    try {
      const res = await loginUser({ email, password });
      const data = await res.json();
      if (!res.ok) {
        setError(data.message || "Failed to login");
        return;
      }
      // Set token deeply into local storage AND cookies so Server components detect the user!
      localStorage.setItem("token", data.token);
      localStorage.setItem("userRole", data.user.role);
      document.cookie = `token=${data.token}; path=/; max-age=86400; SameSite=Lax`;
      document.cookie = `userRole=${data.user.role}; path=/; max-age=86400; SameSite=Lax`;
      
      window.location.href = "/"; // Force a full reload so Server Components see cookies/tokens if we add them later
    } catch (err) {
      setError("An unexpected error occurred.");
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-6 relative overflow-hidden">
      <div className="absolute inset-0 bg-linear-to-tr from-purple-900/20 to-blue-900/20 pointer-events-none" />
      <div className="absolute right-0 top-1/4 w-96 h-96 bg-purple-600/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute left-0 bottom-1/4 w-96 h-96 bg-blue-600/20 rounded-full blur-[120px] pointer-events-none" />

      <div className="w-full max-w-md relative z-10">
        <div className="text-center mb-10">
          <Link href="/" className="text-3xl font-black tracking-tighter bg-linear-to-r from-purple-400 to-blue-500 bg-clip-text text-transparent inline-block mb-2 drop-shadow-[0_0_10px_rgba(168,85,247,0.5)]">
            GEN·Z NEWS
          </Link>
          <h1 className="text-2xl font-bold text-white mt-2">Welcome back</h1>
          <p className="text-zinc-400 mt-2">Enter your details to access your account</p>
        </div>

        <form onSubmit={handleLogin} className="bg-zinc-900/60 backdrop-blur-2xl border border-white/10 p-8 rounded-[2.5rem] shadow-[0_0_50px_rgba(168,85,247,0.15)] flex flex-col gap-6">
          {error && <div className="p-4 bg-red-500/10 border border-red-500/50 text-red-400 rounded-2xl text-sm font-medium text-center shadow-[0_0_15px_rgba(239,68,68,0.2)]">{error}</div>}

          <div>
            <label className="block text-zinc-400 text-sm font-semibold mb-2 ml-2 tracking-wide uppercase">Email</label>
            <input 
              type="email" 
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-black/50 border border-white/5 rounded-3xl px-6 py-4 text-white focus:outline-none focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/50 transition-all placeholder:text-zinc-600 hover:border-white/10 shadow-inner"
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
              className="w-full bg-black/50 border border-white/5 rounded-3xl px-6 py-4 text-white focus:outline-none focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/50 transition-all placeholder:text-zinc-600 hover:border-white/10 shadow-inner"
              placeholder="••••••••"
            />
          </div>

          <button 
            type="submit"
            className="w-full bg-linear-to-r from-purple-600 to-blue-600 text-white font-bold py-4 rounded-3xl mt-4 hover:opacity-90 hover:scale-[1.02] active:scale-95 transition-all shadow-[0_0_20px_rgba(168,85,247,0.4)] hover:shadow-[0_0_30px_rgba(168,85,247,0.6)]"
          >
            Sign In
          </button>
          
          <p className="text-center text-zinc-400 text-sm mt-2">
            Don't have an account? <Link href="/register" className="text-purple-400 hover:text-purple-300 font-bold transition-colors">Sign up</Link>
          </p>
        </form>
      </div>
    </div>
  );
}
