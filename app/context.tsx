'use client'
import React, { createContext, useContext, useState } from "react";
import { AnimeProp } from "./page";

interface contextData {
    faviourite: AnimeProp[],
    setFaviourite: React.Dispatch<React.SetStateAction<AnimeProp[]>>
}



export const AnimeContext = createContext<undefined | contextData>(undefined)

export function useAnimeContext() {
  const ctx = useContext(AnimeContext);
  if (!ctx) throw new Error("useAnimeContext must be used inside <ContextApi>");
  return ctx;
}



export const ContextApi = ({ children }: { children: React.ReactNode }) => {
    const [faviourite, setFaviourite] = useState<AnimeProp[]>([])

    return (
        <AnimeContext.Provider value={{ faviourite, setFaviourite }}>
            {children}
        </AnimeContext.Provider>
    );
};

