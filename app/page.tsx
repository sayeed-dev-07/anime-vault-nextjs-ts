import FetchAnime from '@/components/FetchAnime';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import HeroSection from '@/components/Hero';


export default function HomePage() {
  return (
    <div className="min-h-screen pb-16">

      <main className="max-w-[1600px] mx-auto sm:px-6 md:px-8">

        {/* Insert the new technical editorial hero here */}
        <HeroSection />

        <div className="space-y-12 md:space-y-20 mt-12">
          {/* Anime Section */}
          {/* Anime Section */}
          <section className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between sm:items-end gap-4 border-b border-border/50 pb-3">
              <div>
                <h2 className="text-xl sm:text-2xl font-semibold tracking-tight text-foreground">Trending Animes</h2>
                <p className="text-muted-foreground mt-1 text-xs font-mono tracking-widest uppercase opacity-70">
                  Discover what everyone is watching
                </p>
              </div>
              <Link
                href="/animes"
                className="hidden sm:inline-flex items-center text-xs font-semibold uppercase tracking-wider text-muted-foreground hover:text-foreground transition-colors group"
              >
                View Database
                <span className="ml-2 transform transition-transform group-hover:translate-x-1">→</span>
              </Link>
            </div>

            {/* Assuming FetchAnime renders a CSS grid. If images are still too wide, 
      ensure FetchAnime has a grid class like: grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 */}
            <FetchAnime limit={5} top={false} type={'anime'} />

            <div className="sm:hidden flex justify-center pt-4">
              <Link
                href="/animes"
                className="text-xs font-semibold uppercase tracking-wider text-muted-foreground hover:text-foreground transition-colors"
              >
                View all Anime →
              </Link>
            </div>
          </section>

          {/* Manga Section */}
          <section className="space-y-6 mt-12 md:mt-16">
            <div className="flex flex-col sm:flex-row justify-between sm:items-end gap-4 border-b border-border/50 pb-3">
              <div>
                <h2 className="text-xl sm:text-2xl font-semibold tracking-tight text-foreground">Popular Mangas</h2>
                <p className="text-muted-foreground mt-1 text-xs font-mono tracking-widest uppercase opacity-70">
                  Dive into the latest chapters
                </p>
              </div>
              <Link
                href="/mangas"
                className="hidden sm:inline-flex items-center text-xs font-semibold uppercase tracking-wider text-muted-foreground hover:text-foreground transition-colors group"
              >
                View Database
                <span className="ml-2 transform transition-transform group-hover:translate-x-1">→</span>
              </Link>
            </div>

            {/* Assuming FetchAnime renders a responsive grid layout */}
            <FetchAnime limit={5} top={false} type={'manga'} />

            <div className="sm:hidden flex justify-center pt-4">
              <Link
                href="/mangas"
                className="text-xs font-semibold uppercase tracking-wider text-muted-foreground hover:text-foreground transition-colors"
              >
                View all Manga →
              </Link>
            </div>
          </section>
        </div>

      </main>
    </div>
  );
}