import { getCategories } from "@/services/api";
import Link from "next/link";
import { cookies } from "next/headers";

export default async function Navbar() {
  // Read the cookie via the Next 15 Async feature
  const cookieStore = await cookies();
  const token = cookieStore.get('token')?.value;
  const role = cookieStore.get('userRole')?.value;

  // Pass the token securely into the API request!
  const categories = await getCategories(token);

  // Pick up to 4 categories to display in the navbar so it doesn't crowd out the screen
  const displayedCategories = categories?.length > 0 ? categories.slice(0, 4) : [];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-black/80 backdrop-blur-2xl shadow-[0_4px_30px_rgba(0,0,0,0.5)]">
      <div className="container mx-auto px-6 h-20 flex items-center justify-between">
        <Link href="/" className="text-3xl font-black tracking-tighter bg-linear-to-r from-purple-400 via-pink-500 to-blue-500 bg-clip-text text-transparent drop-shadow-md">
          GEN·Z NEWS
        </Link>
        <nav className="hidden md:flex space-x-8 text-sm font-extrabold text-zinc-400">
          <Link href="/" className="hover:text-white hover:drop-shadow-[0_0_15px_rgba(168,85,247,0.8)] transition-all uppercase tracking-widest text-xs">Trending</Link>
          
          {/* Dynamically Map Actual Database Categories strictly for logged in users */}
          {displayedCategories.map((cat: any) => (
             <Link key={cat._id} href={`/category/${cat._id}`} className="hover:text-white hover:drop-shadow-[0_0_15px_rgba(168,85,247,0.8)] transition-all uppercase tracking-widest text-xs">
                {cat.name}
             </Link>
          ))}



        </nav>
        <div className="flex items-center gap-6">
          {token ? (
            <Link href="/logout" className="text-sm font-bold text-red-400 hover:text-red-300 transition-colors tracking-wide hidden sm:block">
              Logout
            </Link>
          ) : (
            <Link href="/login" className="text-sm font-bold text-zinc-300 hover:text-white transition-colors tracking-wide hidden sm:block">
              Login
            </Link>
          )}
          
          {role === 'admin' ? (
            <Link href="/dashboard" className="bg-white text-black px-6 py-2.5 rounded-full text-sm font-black tracking-wide hover:bg-purple-100 hover:scale-105 active:scale-95 transition-all shadow-[0_0_15px_rgba(255,255,255,0.4)]">
              Dashboard
            </Link>
          ) : !token ? (
            <Link href="/register" className="bg-white text-black px-6 py-2.5 rounded-full text-sm font-black tracking-wide hover:bg-purple-100 hover:scale-105 active:scale-95 transition-all shadow-[0_0_15px_rgba(255,255,255,0.4)]">
              Subscribe
            </Link>
          ) : null}
        </div>
      </div>
    </header>
  );
}
