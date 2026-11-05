'use client'

import { Heart } from 'lucide-react'
import { useStore, FavItem } from './store/zustand'
import { Anime, Manga } from './FetchAnime'

type Props = {
  data: Anime | Manga
  type: 'Anime' | 'Manga'
}

const FavButton = ({ data, type }: Props) => {
  const { favs, toggleFav } = useStore()

  const kind = type === 'Anime' ? 'anime' : 'manga'

  const exists = favs.some(
    (f) => f.mal_id === data.mal_id && f.kind === kind
  )

  const handleClick = (e: React.MouseEvent) => {
    // Prevent the click from bubbling up if the card itself is clickable
    e.preventDefault();
    e.stopPropagation();

    toggleFav({ ...data, kind } as FavItem)
  }

  return (
    <button
      onClick={handleClick}
      aria-label={exists ? "Remove from favorites" : "Add to favorites"}
      className="p-2 sm:p-2.5 border-2 border-[#161616] bg-[#fff8e7] text-[#161616] shadow-[2px_2px_0_#161616] transition-all duration-200 hover:translate-x-px hover:translate-y-px hover:shadow-none active:scale-90 group focus:outline-none focus:ring-2 focus:ring-[#e6392d]"
    >
      <Heart
        size={22}
        className={`transition-all duration-300 ease-out ${exists
          ? 'fill-[#e6392d] stroke-[#e6392d] scale-100'
          : 'fill-transparent stroke-current scale-95 group-hover:scale-100'
          }`}
      />
    </button>
  )
}

export default FavButton
