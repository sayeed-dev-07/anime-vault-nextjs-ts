'use client'

import { useInfiniteQuery } from "@tanstack/react-query";
import Spinner from "./Spinner";
import { useInView } from "react-intersection-observer";
import React, { useEffect } from "react";
import AnimeCard from "./AnimeCard";
import { AnimeProp } from "@/app/page";

const InfiniteScroll = () => {
    const { ref, inView } = useInView({
        threshold: 0,
        rootMargin: '100px', // Trigger 100px before the element comes into view
    });
    
    const fetchData = async ({ pageParam }: { pageParam: number }) => {
        const res = await fetch(`https://shikimori.one/api/animes?page=${pageParam}&limit=8`);
        if (!res.ok) {
            throw new Error('Failed to fetch anime data');
        }
        const data = await res.json();
        return data;
    };

    const {
        data,
        error,
        fetchNextPage,
        hasNextPage,
        isFetching,
        isFetchingNextPage,
        status
    } = useInfiniteQuery({
        queryKey: ['animes'],
        queryFn: fetchData,
        initialPageParam: 1,
        getNextPageParam: (lastPage, allPages) => {
           
            if (!lastPage || lastPage.length < 8) {
                return undefined;
            }
    
            return allPages.length + 1;
        },
    });

    useEffect(() => {
        console.log('InView:', inView, 'HasNextPage:', hasNextPage, 'IsFetchingNextPage:', isFetchingNextPage);
        if (inView && hasNextPage && !isFetchingNextPage) {
            console.log('Fetching next page...');
            const timer = setTimeout(() => {
                fetchNextPage();
            }, 200);
            return () => clearTimeout(timer);
        }
    }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

    if (status === 'pending') {
        return <Spinner />;
    }

    if (status === 'error') {
        return (
            <div className="text-4xl min-h-screen flex items-center justify-center">
                Something went wrong: {error.message}
            </div>
        );
    }

    const allAnime = data?.pages.flatMap(page => page) ?? [];


    return (
        <div>
            <div className="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-7 items-start">
                {allAnime.map((elem: AnimeProp) => (
                    <AnimeCard key={elem.id} anime={elem} />
                ))}
            </div>
            
        
            <div ref={ref} className="flex justify-center py-8 min-h-[100px]">
                {isFetchingNextPage && <Spinner />}
                {!hasNextPage && allAnime.length > 0 && (
                    <p className="text-gray-500">No more anime to load</p>
                )}
            </div>
        </div>
    );
};

export default InfiniteScroll;