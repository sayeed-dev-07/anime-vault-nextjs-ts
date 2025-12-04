'use client'

import { AnimeProp } from '@/app/page'
import { create } from 'zustand'

interface AnimeStoreProp {
    favourites: AnimeProp[];
    addFavourite: (anime: AnimeProp) => void;
    removeFavourite: (id: number) => void;
}

export const useAnimeStore = create<AnimeStoreProp>((set) => ({
  favourites: [],
  addFavourite: (anime) => set((state) => ({ favourites: [...state.favourites, anime] })),
  removeFavourite: (id) => set((state)=>({ favourites: state.favourites.filter(anime=> anime.id !== id) }))
}))
