'use client'

import AnimeCard from '@/components/AnimeCard'
import MangaCard from '@/components/MangaCard'
import { useStore } from '@/components/store/zustand'
import Link from 'next/link'
import { Heart, Tv, Book, Ghost, Search } from 'lucide-react'

const Page = () => {
  const { favs } = useStore()

  const animeFavs = favs.filter((f) => f.kind === 'anime')
  const mangaFavs = favs.filter((f) => f.kind === 'manga')

  return (
    <div className="max-w-[1600px] mb-10 mx-auto   sm:px-6 min-h-screen">

      {/* Page Header */}
      <header className="mb-12">
        <h1 className="text-4xl sm:text-5xl font-extrabold flex items-center gap-3 sm:gap-4 tracking-tight">
          <Heart className="w-10 h-10 sm:w-12 sm:h-12 text-[crimson] fill-[crimson]/20" />
          My Favorites
        </h1>
        <p className="text-muted-foreground mt-3 text-base sm:text-lg max-w-2xl">
          Your personal collection of saved anime and manga. Access all your top picks in one place.
        </p>
      </header>

      {/* --- Anime Section --- */}
      <section className="mb-16">
        {/* Section Header */}
        <div className="flex items-center gap-3 mb-6 border-b border-border pb-4">
          <Tv className="w-6 h-6 sm:w-7 sm:h-7 text-blue-500" />
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">Anime</h2>
          <span className="bg-secondary border border-border/50 text-muted-foreground px-3 py-0.5 rounded-full text-sm font-bold ml-2">
            {animeFavs.length}
          </span>
        </div>

        {animeFavs.length === 0 ? (
          /* Anime Empty State */
          <div className="flex flex-col items-center justify-center py-16 px-4 border-2 border-dashed border-border rounded-2xl bg-secondary/10 text-center">
            <Ghost className="w-16 h-16 text-muted-foreground mb-4 opacity-40" />
            <h3 className="text-xl sm:text-2xl font-bold mb-2">No Anime Saved Yet</h3>
            <p className="text-muted-foreground max-w-md mb-8">
              You haven&apos;t added any anime to your favorites. Explore our collection and click the heart icon to save them here!
            </p>
            <Link
              href="/animes"
              className="inline-flex items-center justify-center gap-2 h-11 px-8 rounded-md bg-[crimson] text-white font-medium hover:bg-[crimson]/90 transition-colors shadow-sm"
            >
              <Search className="w-4 h-4" /> Browse Anime
            </Link>
          </div>
        ) : (
          /* Anime Grid (Uses items-start to prevent vertical stretching) */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 items-start">
            {animeFavs.map((item) => (
              <AnimeCard key={item.mal_id} data={item} />
            ))}
          </div>
        )}
      </section>

      {/* --- Manga Section --- */}
      <section>
        {/* Section Header */}
        <div className="flex items-center gap-3 mb-6 border-b border-border pb-4">
          <Book className="w-6 h-6 sm:w-7 sm:h-7 text-emerald-500" />
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">Manga</h2>
          <span className="bg-secondary border border-border/50 text-muted-foreground px-3 py-0.5 rounded-full text-sm font-bold ml-2">
            {mangaFavs.length}
          </span>
        </div>

        {mangaFavs.length === 0 ? (
          /* Manga Empty State */
          <div className="flex flex-col items-center justify-center py-16 px-4 border-2 border-dashed border-border rounded-2xl bg-secondary/10 text-center">
            <Ghost className="w-16 h-16 text-muted-foreground mb-4 opacity-40" />
            <h3 className="text-xl sm:text-2xl font-bold mb-2">No Manga Saved Yet</h3>
            <p className="text-muted-foreground max-w-md mb-8">
              Your manga library is currently empty. Dive into the manga catalog to find your next great read.
            </p>
            <Link
              href="/mangas"
              className="inline-flex items-center justify-center gap-2 h-11 px-8 rounded-md bg-[crimson] text-white font-medium hover:bg-[crimson]/90 transition-colors shadow-sm"
            >
              <Search className="w-4 h-4" /> Browse Manga
            </Link>
          </div>
        ) : (
          /* Manga Grid (Uses items-start to prevent vertical stretching) */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 items-start">
            {mangaFavs.map((item) => (
              <MangaCard key={item.mal_id} data={item} />
            ))}
          </div>
        )}
      </section>

    </div>
  )
}

export default Page