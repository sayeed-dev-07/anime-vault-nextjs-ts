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

  const handleClick = () => {
    toggleFav({ ...data, kind } as FavItem)
  }

  return (
    <div
      onClick={handleClick}
      className="p-3 bg-[#000000a9] rounded-full cursor-pointer"
    >
      <Heart
        size={32}
        className={
          exists
            ? 'fill-[crimson] stroke-[crimson]'
            : 'stroke-white hover:stroke-[crimson]'
        }
      />
    </div>
  )
}

export default FavButton
