import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import { getNewsById } from "@/services/api";
import { cookies } from "next/headers";
import { notFound } from "next/navigation";

export default async function NewsDetail({ params }: { params: Promise<{ id: string }> }) {
  const cookieStore = await cookies();
  const token = cookieStore.get('token')?.value;
  const { id } = await params;

  const article = await getNewsById(id, token);

  if (!article) {
    notFound();
  }

  const formattedDate = new Date(article.createdAt).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });

  const fallbackImage = "https://images.unsplash.com/photo-1504711434969-e33886168f5c?q=80&w=2070&auto=format&fit=crop";

  return (
    <div className="min-h-screen bg-black text-white selection:bg-purple-500 selection:text-white">
      <Navbar />
      <main className="pt-0 pb-32">
        {/* Hero Section */}
        <div className="relative w-full h-[50vh] md:h-[70vh] mb-16 overflow-hidden">
          <Image 
            src={article.imageUrl || fallbackImage} 
            alt={article.title} 
            fill 
            sizes="100vw"
            priority
            className="object-cover opacity-60"
          />
          <div className="absolute inset-0 bg-linear-to-t from-black via-black/40 to-transparent" />
          
          <div className="absolute bottom-0 w-full p-6 md:p-16">
            <div className="max-w-4xl mx-auto flex flex-col items-start gap-4">
              <Link href="/" className="inline-flex items-center gap-2 text-white/50 hover:text-white mb-4 transition-colors uppercase tracking-widest text-xs">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
                Back to Home
              </Link>
              
              {article.category && (
                <span className="px-4 py-1.5 text-xs font-bold uppercase tracking-widest border border-purple-500/50 bg-purple-500/20 text-purple-300 rounded-full backdrop-blur-md">
                  {article.category.name}
                </span>
              )}
              <h1 className="text-4xl md:text-6xl font-black leading-tight tracking-tight drop-shadow-lg">
                {article.title}
              </h1>
              <div className="flex items-center gap-4 text-zinc-300 font-medium text-sm mt-4">
                <span className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-linear-to-br from-purple-500 to-blue-500 flex items-center justify-center text-xs font-bold text-white shadow-md">
                    {article.author ? article.author.charAt(0).toUpperCase() : 'A'}
                  </div>
                  {article.author || 'Anonymous'}
                </span>
                <span className="text-white/30">•</span>
                <span>{formattedDate}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Content Section */}
        <div className="max-w-3xl mx-auto px-6">
          <article className="prose prose-invert prose-lg prose-purple max-w-none text-zinc-300 leading-relaxed space-y-6">
             {article.content.split('\n').map((paragraph: string, i: number) => (
                <p key={i} className="mb-4 text-lg/8 whitespace-pre-wrap">{paragraph}</p>
             ))}
          </article>
        </div>
      </main>
    </div>
  );
}
