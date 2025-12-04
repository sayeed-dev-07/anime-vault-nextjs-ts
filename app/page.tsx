'use client'
import AnimeCard from "@/app/components/AnimeCard";
import Spinner from "@/app/components/Spinner";
import { useQuery } from "@tanstack/react-query";

import Link from "next/link";

interface imageProp {
  original: string
}
export interface AnimeProp {
  id: number,
  name: string,
  image: imageProp,
  kind: string,
  score: string
}
export interface AnimePropContainer {
  anime: AnimeProp
}

export default function Home() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['animedata'],
    queryFn: async () => {
      const res = await fetch('https://shikimori.one/api/animes?page=1&limit=4');
      return res.json();
    },
  });
  if (isError) {
    return <div>
      Something went wrong
    </div>
  }
  if (isLoading) {
    return <div className="min-h-[calc(100vh-100px)] w-full flex items-center justify-center">
      <Spinner />
    </div>
  }

  return (
    <div className="py-[4%]">
      <div className="min-h-[50vh] sm:min-h-[80vh] flex items-center justify-center sm:text-4xl text-2xl sm:max-w-[80vw] w-full md:max-w-[60vw] text-center flex-col gap-y-5  mx-auto ">
        <p className="capitalize text-[#001219]">Welcome to <span className="font-semibold text-[#1d5c5f] ">Anime Vault</span> — discover, explore, and fall in love with your favorite anime all over again</p>
        <Link className="underline capitalize text-[#0880af]" href="/animes">browse animes</Link>
      </div>
      <div>
        <p className="capitalize font-semibold text-[#001219] mb-6 text-3xl sm:text-5xl ">New animes</p>
      </div>
      <div className="grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-7">
        {
          data.map((anime: AnimeProp) => {
            return (
              <AnimeCard key={anime.id} anime={anime} />
            )
          })
        }
      </div>
      <div>
      </div>
    </div>
  );
}
