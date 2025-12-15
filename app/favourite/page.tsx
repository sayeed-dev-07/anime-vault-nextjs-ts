'use client'

import AnimeCard from '@/components/AnimeCard'
import MangaCard from '@/components/MangaCard'
import { useStore } from '@/components/store/zustand'
import Link from 'next/link'

const Page = () => {
  const { favs } = useStore()

  const animeFavs = favs.filter((f) => f.kind === 'anime')
  const mangaFavs = favs.filter((f) => f.kind === 'manga')

  return (
    <div className="max-w-[1600px] mx-auto py-10 px-4">
      <p className="sm:text-6xl text-3xl">Favourite</p>

      {/* Anime */}
      <p className="sm:text-4xl mt-5 text-2xl">Anime :</p>
      {animeFavs.length === 0 ? (
        <div className="min-h-[30vh] flex flex-col gap-y-3 items-center justify-center">
          <p className="text-3xl">No Anime Added Yet</p>
          <Link className="underline text-lg" href="/animes">
            Animes
          </Link>
        </div>
      ) : (
        <div className="my-6 grid gap-4 justify-start
          grid-cols-[repeat(auto-fit,minmax(320px,320px))]">
          {animeFavs.map((item) => (
            <AnimeCard key={item.mal_id} data={item} />
          ))}
        </div>
      )}

      {/* Manga */}
      <p className="sm:text-4xl text-2xl">Manga :</p>
      {mangaFavs.length === 0 ? (
        <div className="min-h-[30vh] flex flex-col gap-y-3 items-center justify-center">
          <p className="text-3xl">No Manga Added Yet</p>
          <Link className="underline text-lg" href="/mangas">
            Mangas
          </Link>
        </div>
      ) : (
        <div className="my-6 grid gap-4 justify-start
          grid-cols-[repeat(auto-fit,minmax(320px,320px))]">
          {mangaFavs.map((item) => (
            <MangaCard key={item.mal_id} data={item} />
          ))}
        </div>
      )}
    </div>
  )
}

export default Page
