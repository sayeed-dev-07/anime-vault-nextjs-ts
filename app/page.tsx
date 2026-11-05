import FetchAnime from '@/components/FetchAnime';
import Link from 'next/link';
import HeroSection from '@/components/Hero';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Anime & Manga Database',
  description: 'Discover trending anime and popular manga, then explore detailed information for your next favorite series.',
};


export default function HomePage() {
  return (
    <div className="min-h-screen pb-16">

      <main className="max-w-[1600px] mx-auto sm:px-6 md:px-8">

        {/* Insert the new technical editorial hero here */}
        <HeroSection />

        <div className="space-y-16 md:space-y-24 mt-12">
          {/* Anime Section */}
          {/* Anime Section */}
          <section className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between sm:items-end gap-4 border-b-[3px] border-border pb-4">
              <div>
                <p className="inline-block bg-[#e6392d] text-white px-2 py-1 text-[10px] font-black tracking-widest uppercase -rotate-1 mb-2">Fresh from the vault</p>
                <h2 className="comic-heading text-xl sm:text-3xl text-foreground">Trending Anime</h2>
                <p className="text-muted-foreground mt-2 text-sm font-bold tracking-wide uppercase">
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
            <FetchAnime limit={4} top={false} type={'anime'} />

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
            <div className="flex flex-col sm:flex-row justify-between sm:items-end gap-4 border-b-[3px] border-border pb-4">
              <div>
                <p className="inline-block bg-[#f9c846] text-[#161616] px-2 py-1 text-[10px] font-black tracking-widest uppercase rotate-1 mb-2">Turn the page</p>
                <h2 className="comic-heading text-xl sm:text-3xl text-foreground">Popular Manga</h2>
                <p className="text-muted-foreground mt-2 text-sm font-bold tracking-wide uppercase">
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
            <FetchAnime limit={4} top={false} type={'manga'} />

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
