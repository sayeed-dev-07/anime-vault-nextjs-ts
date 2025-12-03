'use client'
import { useContext } from "react";
import { AnimeContext, useAnimeContext } from "../context";
import AnimeCard from "@/components/AnimeCard";
import Link from "next/link";




const Faviourite = () => {
    const { faviourite } = useAnimeContext()

    return (
        <div className="py-[5%] sm:py-[3%]">
            
            {
                faviourite.length > 0 ?
                (<div>
                <p className="text-3xl font-semibold mb-3">WishList : </p>

                <div className="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))]  gap-7">
                    {
                        faviourite.map((anime, index) => <AnimeCard key={`${anime.id}-${index}`} anime={anime} />)
                    }
                </div>
            </div>) : 
           ( <div className="min-h-[90vh] items-center flex w-full justify-center flex-col gap-y-3">
                <p className="text-3xl">No anime added</p>
                <Link href={'/animes'} className="underline text-lg">Browse Animes</Link>
            </div>)
            }

        </div>
    );
};

export default Faviourite;