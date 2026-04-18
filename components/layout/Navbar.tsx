export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-black/50 backdrop-blur-xl">
      <div className="container mx-auto px-6 h-20 flex items-center justify-between">
        <div className="text-2xl font-bold tracking-tighter bg-linear-to-r from-purple-400 to-blue-500 bg-clip-text text-transparent">
          GEN·Z NEWS
        </div>
        <nav className="hidden md:flex space-x-8 text-sm font-medium text-zinc-400">
          <a href="#" className="hover:text-white transition-colors">Trending</a>
          <a href="#" className="hover:text-white transition-colors">Tech</a>
          <a href="#" className="hover:text-white transition-colors">Culture</a>
          <a href="#" className="hover:text-white transition-colors">Politics</a>
        </nav>
        <button className="bg-white text-black px-5 py-2.5 rounded-full text-sm font-bold hover:bg-zinc-200 transition-colors">
          Subscribe
        </button>
      </div>
    </header>
  );
}
