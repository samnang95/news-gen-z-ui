import Image from "next/image";
import Link from "next/link";
import { getNews } from "@/services/api";
import { cookies } from "next/headers";

export default async function TrendingArticles() {
  const cookieStore = await cookies();
  const token = cookieStore.get('token')?.value;

  const news = await getNews(token);

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
            <Link href={`/news/${item._id}`} key={item._id} className="group relative rounded-3xl overflow-hidden border border-white/5 bg-zinc-900 hover:border-purple-500/30 transition-all duration-500 block hover:-translate-y-2 shadow-xl hover:shadow-[0_15px_40px_rgba(168,85,247,0.2)]">
              <div className="aspect-4/3 bg-zinc-800 relative overflow-hidden">
                <Image src={item.imageUrl || "https://images.unsplash.com/photo-1504711434969-e33886168f5c?q=80&w=2070&auto=format&fit=crop"} alt={item.title} fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover opacity-60 group-hover:opacity-80 group-hover:scale-[1.05] transition-all duration-700" />
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
            </Link>
          ))
        ) : (
          <div className="col-span-full py-20 text-center text-zinc-500 border border-white/5 rounded-3xl bg-zinc-900/30 backdrop-blur-sm font-semibold tracking-wide">
            No trending articles found yet.
          </div>
        )}
      </div>
    </section>
  );
}
