import Image from "next/image";
import { getNews } from "@/services/api";

export default async function TrendingArticles() {
  const news = await getNews();

  return (
    <section>
      <div className="flex items-center justify-between mb-10">
        <h2 className="text-4xl font-extrabold tracking-tight flex items-center gap-4 text-transparent bg-clip-text bg-linear-to-r from-white to-zinc-500">
          <span className="w-4 h-8 bg-purple-500 rounded-full inline-block shadow-[0_0_15px_rgba(168,85,247,0.5)]" />
          Trending Now
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {news && news.length > 0 ? (
          news.map((item: any) => (
            <div key={item._id} className="group relative rounded-3xl overflow-hidden border border-white/5 bg-zinc-900 hover:border-purple-500/30 transition-all duration-500 cursor-pointer hover:-translate-y-2 shadow-xl hover:shadow-[0_15px_40px_rgba(168,85,247,0.2)]">
              <div className="aspect-4/3 bg-zinc-800 relative overflow-hidden">
                <Image src="/article_tech.png" alt={item.title} fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover opacity-60 group-hover:opacity-80 group-hover:scale-[1.05] transition-all duration-700" />
                <div className="absolute inset-0 bg-linear-to-t from-black via-black/40 to-transparent" />
              </div>
              <div className="p-8 absolute bottom-0 w-full z-10 bg-linear-to-t from-black via-black/90 to-transparent">
                <div className="flex items-center gap-3 mb-4">
                  <span className="px-3 py-1 text-xs font-bold uppercase tracking-widest border border-purple-500/50 bg-purple-500/20 text-purple-300 rounded-full backdrop-blur-md">
                    {item.category?.name || "News"}
                  </span>
                </div>
                <h3 className="text-2xl font-bold mb-3 text-white group-hover:text-purple-400 transition-colors leading-tight drop-shadow-md">{item.title}</h3>
                <p className="text-zinc-400 text-sm leading-relaxed line-clamp-2">{item.content}</p>
              </div>
            </div>
          ))
        ) : (
          /* Fallback Mock Data showcasing generated thumbnails */
          <>
            <div className="group relative rounded-3xl overflow-hidden border border-white/5 bg-zinc-900 transition-all duration-500 cursor-pointer hover:-translate-y-2 shadow-xl hover:shadow-[0_15px_40px_rgba(168,85,247,0.2)] hover:border-purple-500/30">
              <div className="aspect-4/3 bg-zinc-800 relative overflow-hidden">
                <Image src="/article_culture.png" alt="Culture" fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover opacity-70 group-hover:opacity-100 group-hover:scale-[1.05] transition-all duration-700" />
                <div className="absolute inset-0 bg-linear-to-tr from-purple-900/60 to-transparent opacity-80" />
                 <div className="absolute inset-0 bg-linear-to-t from-black via-black/40 to-transparent" />
              </div>
              <div className="p-8 absolute bottom-0 w-full z-10 bg-linear-to-t from-black via-black/90 to-transparent">
                <div className="flex items-center gap-3 mb-3">
                  <span className="px-3 py-1 text-xs font-bold uppercase tracking-widest bg-purple-500/90 text-white rounded-full shadow-[0_0_10px_rgba(168,85,247,0.5)]">Culture</span>
                  <span className="text-zinc-300 text-xs font-bold uppercase tracking-wider drop-shadow-md">2 hours ago</span>
                </div>
                <h3 className="text-2xl font-bold mb-2 text-white group-hover:text-purple-300 transition-colors leading-snug drop-shadow-lg">How Gen Z is Rewriting the Rules of the Workplace</h3>
              </div>
            </div>

            <div className="group relative rounded-3xl overflow-hidden border border-white/5 bg-zinc-900 transition-all duration-500 cursor-pointer hover:-translate-y-2 shadow-xl hover:shadow-[0_15px_40px_rgba(16,185,129,0.2)] hover:border-emerald-500/30">
              <div className="aspect-4/3 bg-zinc-800 relative overflow-hidden">
                <Image src="/article_tech.png" alt="Tech" fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover opacity-70 group-hover:opacity-100 group-hover:scale-[1.05] transition-all duration-700" />
                <div className="absolute inset-0 bg-linear-to-tr from-emerald-900/60 to-transparent opacity-80" />
                <div className="absolute inset-0 bg-linear-to-t from-black via-black/40 to-transparent" />
              </div>
              <div className="p-8 absolute bottom-0 w-full z-10 bg-linear-to-t from-black via-black/90 to-transparent">
                <div className="flex items-center gap-3 mb-3">
                  <span className="px-3 py-1 text-xs font-bold uppercase tracking-widest bg-emerald-500/90 text-white rounded-full shadow-[0_0_10px_rgba(16,185,129,0.5)]">Tech</span>
                  <span className="text-zinc-300 text-xs font-bold uppercase tracking-wider drop-shadow-md">5 hours ago</span>
                </div>
                <h3 className="text-2xl font-bold mb-2 text-white group-hover:text-emerald-300 transition-colors leading-snug drop-shadow-lg">The AI Assistant Everyone is Actually Using</h3>
              </div>
            </div>

            <div className="group relative rounded-3xl overflow-hidden border border-white/5 bg-zinc-900 transition-all duration-500 cursor-pointer hover:-translate-y-2 shadow-xl hover:shadow-[0_15px_40px_rgba(249,115,22,0.2)] hover:border-orange-500/30">
              <div className="aspect-4/3 bg-zinc-800 relative overflow-hidden">
                 <Image src="/genz_hero_bg.png" alt="Politics" fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover opacity-70 group-hover:opacity-100 group-hover:scale-[1.05] transition-all duration-700" />
                <div className="absolute inset-0 bg-linear-to-tr from-orange-900/60 to-transparent opacity-80" />
                 <div className="absolute inset-0 bg-linear-to-t from-black via-black/40 to-transparent" />
              </div>
              <div className="p-8 absolute bottom-0 w-full z-10 bg-linear-to-t from-black via-black/90 to-transparent">
                <div className="flex items-center gap-3 mb-3">
                  <span className="px-3 py-1 text-xs font-bold uppercase tracking-widest bg-orange-500/90 text-white rounded-full shadow-[0_0_10px_rgba(249,115,22,0.5)]">Politics</span>
                  <span className="text-zinc-300 text-xs font-bold uppercase tracking-wider drop-shadow-md">8 hours ago</span>
                </div>
                <h3 className="text-2xl font-bold mb-2 text-white group-hover:text-orange-300 transition-colors leading-snug drop-shadow-lg">Climate Policy Gets a Major Update Next Month</h3>
              </div>
            </div>
          </>
        )}
      </div>
    </section>
  );
}
