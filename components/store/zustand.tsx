// components/store/zustand.ts
import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { Anime, Manga } from '../FetchAnime'

export type FavItem =
  | (Anime & { kind: 'anime' })
  | (Manga & { kind: 'manga' })

type Store = {
  favs: FavItem[]
  toggleFav: (item: FavItem) => void
}

export const useStore = create<Store>()(
  persist(
    (set) => ({
      favs: [],
      toggleFav: (item) =>
        set((state) => ({
          favs: state.favs.some(
            (f) => f.mal_id === item.mal_id && f.kind === item.kind
          )
            ? state.favs.filter(
                (f) =>
                  !(
                    f.mal_id === item.mal_id &&
                    f.kind === item.kind
                  )
              )
            : [...state.favs, item],
        })),
    }),
    {
      name: 'favorites-storage',
    }
  )
)
