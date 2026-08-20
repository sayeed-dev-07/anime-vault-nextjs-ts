import FetchAnime from '@/components/FetchAnime';
import Link from 'next/link';
import { ChevronRight, PlayCircle, BookOpen, Sparkles } from 'lucide-react';

export default function HomePage() {
  return (
    <div className="min-h-screen pb-16">
      
      {/* Hero Section */}
      <section className="relative px-4 sm:px-6 pt-8 pb-8 md:pt-12 md:pb-12 max-w-[1600px] mx-auto">
        <div className="relative flex flex-col items-center text-center px-4 py-16 md:py-24 rounded-3xl bg-secondary/30 border border-border shadow-sm overflow-hidden">
          
          {/* Subtle Background Glow inside the container */}
          <div className="absolute inset-0 -z-10 h-full w-full bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(220,20,60,0.15),rgba(255,255,255,0))] dark:bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(220,20,60,0.15),rgba(0,0,0,0))]" />

          {/* Small Top Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 mb-6 rounded-full bg-background border border-border text-xs sm:text-sm font-medium text-muted-foreground shadow-sm">
            <Sparkles className="w-4 h-4 text-[crimson]" />
            Tracking thousands of Anime & Manga
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-primary mb-6">
            Welcome to <span className="text-[crimson]">Ani</span>Search
          </h1>
          
          <p className="max-w-[650px] text-lg sm:text-xl text-muted-foreground mb-10 leading-relaxed font-medium px-4">
            Your ultimate destination for discovering detailed information about your favorite anime and manga. Track, explore, and curate your personal database.
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto px-4">
            {/* Primary CTA (Raw Tailwind) */}
            <Link 
              href="/animes" 
              className="inline-flex items-center justify-center gap-2 w-full sm:w-auto h-12 px-8 rounded-full bg-[crimson] text-white font-semibold hover:bg-[crimson]/90 hover:scale-105 active:scale-95 transition-all duration-300 shadow-lg shadow-[crimson]/20"
            >
              <PlayCircle className="w-5 h-5" />
              Explore Anime
            </Link>
            
            {/* Secondary CTA (Raw Tailwind Outline) */}
            <Link 
              href="/mangas" 
              className="inline-flex items-center justify-center gap-2 w-full sm:w-auto h-12 px-8 rounded-full border-2 border-border bg-background text-foreground font-semibold hover:bg-secondary hover:text-foreground hover:scale-105 active:scale-95 transition-all duration-300"
            >
              <BookOpen className="w-5 h-5" />
              Read Manga
            </Link>
          </div>
        </div>
      </section>

      {/* Content Sections - Tightened space-y to pull content up */}
      <main className="max-w-[1600px] mx-auto px-4 sm:px-6 md:px-8 space-y-12 md:space-y-16 mt-4">
        
        {/* Anime Section */}
        <section className="space-y-6">
          {/* Section Header */}
          <div className="flex flex-col sm:flex-row justify-between items-end gap-4 border-b border-border pb-4">
            <div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight">Trending Animes</h2>
              <p className="text-muted-foreground mt-1.5 text-sm sm:text-base">Discover what everyone is watching right now.</p>
            </div>
            {/* Desktop 'View All' Ghost Button */}
            <Link 
              href="/animes"
              className="hidden sm:inline-flex items-center justify-center gap-1 h-10 px-4 py-2 rounded-md font-semibold text-sm hover:bg-secondary hover:text-[crimson] transition-colors"
            >
              View all <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
          
          <FetchAnime limit={4} top={false} type={'anime'} />
          
          {/* Mobile 'View All' Outline Button */}
          <div className="sm:hidden flex justify-center pt-2">
            <Link 
              href="/animes" 
              className="inline-flex items-center justify-center gap-2 w-full h-11 px-4 py-2 rounded-md border border-border bg-secondary/50 font-semibold hover:bg-secondary hover:text-foreground transition-colors"
            >
              View all Anime <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        </section>

        {/* Manga Section */}
        <section className="space-y-6">
          {/* Section Header */}
          <div className="flex flex-col sm:flex-row justify-between items-end gap-4 border-b border-border pb-4">
            <div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight">Popular Mangas</h2>
              <p className="text-muted-foreground mt-1.5 text-sm sm:text-base">Dive into the latest chapters and classic volumes.</p>
            </div>
            {/* Desktop 'View All' Ghost Button */}
            <Link 
              href="/mangas"
              className="hidden sm:inline-flex items-center justify-center gap-1 h-10 px-4 py-2 rounded-md font-semibold text-sm hover:bg-secondary hover:text-[crimson] transition-colors"
            >
              View all <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
          
          <FetchAnime limit={4} top={false} type={'manga'} />

          {/* Mobile 'View All' Outline Button */}
          <div className="sm:hidden flex justify-center pt-2">
            <Link 
              href="/mangas" 
              className="inline-flex items-center justify-center gap-2 w-full h-11 px-4 py-2 rounded-md border border-border bg-secondary/50 font-semibold hover:bg-secondary hover:text-foreground transition-colors"
            >
              View all Manga <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        </section>

      </main>
    </div>
  );
}