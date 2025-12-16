import { HeroSection } from '@/components/home/HeroSection';
import { LatestNews } from '@/components/home/LatestNews';

export default function Home() {
  return (
    <main className="container mx-auto px-4 py-8 min-h-screen">
      {/* 1. Header Area */}
      <div className="mb-8 py-4 border-b border-slate-200">
         <p className="text-sm font-bold text-slate-500 uppercase tracking-widest mb-1">
            {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
         </p>
         <h1 className="text-6xl font-black font-serif tracking-tighter text-slate-900">
            Capital News.
         </h1>
      </div>

      {/* 2. The Hero Block */}
      <HeroSection />

      {/* 3. The Feed */}
      <LatestNews />
    </main>
  );
}