import Image from "next/image";

export default function Hero() {
  return (
    <section className="mb-32 relative rounded-[3rem] overflow-hidden min-h-[70vh] flex flex-col justify-end p-8 md:p-16 border border-white/10 group shadow-[0_0_50px_rgba(168,85,247,0.15)] hover:shadow-[0_0_80px_rgba(168,85,247,0.3)] transition-shadow duration-700">
      {/* Background Image - User should place genz_hero_bg.png in public/ */}
      <div className="absolute inset-0 bg-zinc-900 z-0">
        <Image 
          src="/genz_hero_bg.png" 
          alt="Hero Background" 
          fill 
          priority
          sizes="100vw"
          className="object-cover opacity-40 transition-transform duration-1000 group-hover:scale-[1.03]"
        />
        <div className="absolute inset-0 bg-linear-to-t from-black via-black/60 to-transparent pointer-events-none" />
      </div>
      
      <div className="relative z-10 max-w-4xl">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-purple-500/40 bg-purple-500/10 text-purple-200 text-xs font-bold tracking-widest uppercase mb-8 backdrop-blur-md shadow-[0_0_15px_rgba(168,85,247,0.2)]">
          <span className="w-2 h-2 rounded-full bg-purple-400 animate-pulse shadow-[0_0_10px_#a855f7]" />
          Live Now: The Global Shift
        </div>
        <h1 className="text-6xl md:text-8xl font-black tracking-tighter mb-8 leading-[1.05]">
          <span className="block text-white transition-all duration-300 group-hover:tracking-tight text-shadow-sm">THE TRUTH,</span>
          <span className="block text-transparent bg-clip-text bg-linear-to-br from-purple-400 via-pink-500 to-blue-500 drop-shadow-[0_0_10px_rgba(168,85,247,0.3)]">NO FILTER.</span>
        </h1>
        <p className="text-xl md:text-2xl text-zinc-300/90 max-w-2xl leading-relaxed mb-10 font-medium">
          Your daily dose of uncensored perspectives, deep dives, and breaking stories tailored for the generation reshaping the world.
        </p>
        <div className="flex flex-col sm:flex-row gap-5">
          <button className="bg-linear-to-r from-purple-600 to-blue-600 px-8 py-4 rounded-full font-bold text-lg hover:opacity-90 transition-all hover:scale-105 active:scale-95 flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(168,85,247,0.4)] hover:shadow-[0_0_30px_rgba(168,85,247,0.6)]">
            Read Latest
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
          </button>
          <button className="px-8 py-4 rounded-full font-bold text-lg border border-white/20 hover:bg-white/10 transition-all hover:border-white/40 backdrop-blur-md">
            Explore Categories
          </button>
        </div>
      </div>
    </section>
  );
}
