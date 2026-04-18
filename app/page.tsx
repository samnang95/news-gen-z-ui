import Navbar from "@/components/layout/Navbar";
import Hero from "@/components/home/Hero";
import TrendingArticles from "@/components/home/TrendingArticles";

export default function Home() {
  return (
    <div className="min-h-screen bg-black text-white selection:bg-purple-500 selection:text-white">
      <Navbar />

      <main className="container mx-auto px-6 pt-20 pb-24">
        <Hero />
        <TrendingArticles />
      </main>
    </div>
  );
}
