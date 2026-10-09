'use client'

import AnimeCard from '@/components/AnimeCard'
import MangaCard from '@/components/MangaCard'
import { useStore } from '@/components/store/zustand'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

const Page = () => {
  const { favs } = useStore()

  const animeFavs = favs.filter((f) => f.kind === 'anime')
  const mangaFavs = favs.filter((f) => f.kind === 'manga')

  return (
    <div className="max-w-[1600px] mx-auto  md:px-8 min-h-screen pt-8 md:pt-16 pb-24">

      {/* Editorial Page Header */}
      <header className="mb-16 border-b-2 border-border pb-6">

        <h1 className="text-5xl md:text-7xl lg:text-[6rem]  uppercase tracking-tighter text-foreground leading-[0.85]">
          Favorites.
        </h1>
      </header>

      {/* --- Anime Section --- */}
      <section className="mb-24">
        {/* Minimalist Section Header */}
        <div className="flex items-end justify-between mb-8 border-b border-border/50 pb-3">
          <h2 className="text-xl sm:text-2xl font-bold uppercase tracking-tight text-foreground">
            Anime
          </h2>
          <span className=" text-xs sm:text-sm tracking-[0.2em] text-muted-foreground">
            {animeFavs.length.toString().padStart(2, '0')}
          </span>

        </div>

        {animeFavs.length === 0 ? (
          /* Brutalist Empty State */
          <div className="w-full flex flex-col items-center justify-center py-20 px-4 border border-border bg-muted/10 text-center">
            <span className="text-[14px] tracking-[0.2em] uppercase text-muted-foreground mb-2">
              Empty
            </span>
            <h3 className="text-lg font-bold uppercase tracking-wider mb-8">
              No Anime  Found
            </h3>
            <Link
              href="/animes"
              className="group flex items-center justify-center gap-3 w-[240px] h-12 border border-foreground bg-foreground text-background font-bold uppercase tracking-[0.2em] text-[10px] hover:bg-transparent hover:text-foreground transition-all duration-300"
            >
              Browse
              <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1 group-hover:text-[crimson]" />
            </Link>
          </div>
        ) : (
          /* Gallery Grid */
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 sm:gap-5 items-start">
            {animeFavs.map((item) => (
              <AnimeCard key={item.mal_id} data={item} />
            ))}
          </div>
        )}
      </section>

      {/* --- Manga Section --- */}
      <section>
        {/* Minimalist Section Header */}
        <div className="flex items-end justify-between mb-8 border-b border-border/50 pb-3">
          <h2 className="text-xl sm:text-2xl font-bold uppercase tracking-tight text-foreground">
            Manga
          </h2>
          <span className=" text-xs sm:text-sm tracking-[0.2em] text-muted-foreground">
            {mangaFavs.length.toString().padStart(2, '0')}
          </span>
        </div>

        {mangaFavs.length === 0 ? (
          /* Brutalist Empty State */
          <div className="w-full flex flex-col items-center justify-center py-20 px-4 border border-border bg-muted/10 text-center">
            <span className=" text-[14px] tracking-[0.2em] uppercase text-muted-foreground mb-2">
              Empty
            </span>
            <h3 className="text-lg font-bold uppercase tracking-wider mb-8">
              No Manga Found
            </h3>
            <Link
              href="/mangas"
              className="group flex items-center justify-center gap-3 w-[240px] h-12 border border-foreground bg-foreground text-background font-bold uppercase tracking-[0.2em] text-[10px] hover:bg-transparent hover:text-foreground transition-all duration-300"
            >
              Browse
              <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1 group-hover:text-[crimson]" />
            </Link>
          </div>
        ) : (
          /* Gallery Grid */
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 sm:gap-5 items-start">
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