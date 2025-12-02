'use client'

import { useInfiniteQuery } from "@tanstack/react-query";
import Spinner from "./Spinner";
import { useInView } from "react-intersection-observer";
import React, { useEffect } from "react";
import AnimeCard from "./AnimeCard";
import { AnimeProp } from "@/app/page";

const InfiniteScroll = () => {
    const { ref, inView } = useInView({
    });

    const fetchData = async ({pageParam = 1}) => {
        const data = await fetch(`https://shikimori.one/api/animes?page=${pageParam}&limit=8`)
        return await data.json()
    }
    const { isPending, data, error, fetchNextPage, hasNextPage, isFetchingNextPage } = useInfiniteQuery(
        {
            queryKey: ['anime'],
            queryFn: fetchData,
            staleTime: 10000,
            initialPageParam: 1,
            getNextPageParam: (lastPage, AllPages) => {
                return lastPage.length === 0 ? null : AllPages.length + 1
            }
        }
    )
    useEffect(()=>{
        if (inView && hasNextPage) {
            setTimeout(()=>{
                fetchNextPage()
            },500)
        }
    },[fetchNextPage, hasNextPage, inView])
    const animes = data ? data.pages.flatMap((page => page)) : []


    if (isPending) {
        return <div className="min-h-[70vh] flex items-center justify-center">
            <Spinner />
        </div>
    }
    if (error) {
        return (<div className="min-h-[70vh] flex items-center justify-center">
            <p className="text-3xl">Something went wrong : {error.message}</p>
        </div>)

    }
    return (
        <div>
            <div className="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-7">
                {
                    animes.map((anime, index) => <AnimeCard key={`${anime.id}-${index}`} anime={anime} />)
                }
            </div>
            {
                hasNextPage && <div ref={ref}>
                <Spinner/> 
            </div>
            }
        </div>
    );
};

export default InfiniteScroll;