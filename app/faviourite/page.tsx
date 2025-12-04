'use client'


import AnimeCard from "@/app/components/AnimeCard";
import Link from "next/link";
import { useAnimeStore } from "../animes/store/animeStore";




const Faviourite = () => {
    const { favourites } = useAnimeStore()

    return (
        <div className="py-[5%] sm:py-[3%]">

            {
                favourites.length > 0 ?
                    (<div>
                        <p className="text-3xl font-semibold mb-3">WishList : </p>

                        <div className="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))]  gap-7">
                            {
                                favourites.map((anime, index) => <AnimeCard key={`${anime.id}-${index}`} anime={anime} />)
                            }
                        </div>
                    </div>) :
                    (<div className="min-h-[90vh] items-center flex w-full justify-center flex-col gap-y-3">
                        <p className="text-3xl">No anime added</p>
                        <Link href={'/animes'} className="underline text-lg">Browse Animes</Link>
                    </div>)
            }

        </div>
    );
};

export default Faviourite;