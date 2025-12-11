'use client'
import { useInfiniteQuery } from '@tanstack/react-query'
import { fetchInf } from './InfinityFetch';
import Error from './Error';
import AnimeCard from './AnimeCard';
import { Anime, Manga } from './FetchAnime';
import { useInView } from 'react-intersection-observer';
import { useEffect } from 'react';
import Spinner from './Spinner';
import MangaCard from './MangaCard';

import Masonry from 'react-masonry-css';

const breakpointColumns = {
    default: 4,
    1250: 3,
    768: 2,
    480: 1,
};
type nameProp = 'animeData' | 'mangaData'
type randomIdntProp = 'anime' | 'animeTop' | 'manga' | 'mangaTop' | 'gen-anime' | 'gen-manga'
interface inftProp{
    name?: nameProp,
    top?: boolean,
    randomIdnt: randomIdntProp,
    gener?: boolean,
    genID?: number
}

const InfinityScroll = ({ name = 'animeData', top = false, randomIdnt, gener= false, genID=1}: inftProp) => {

    const {
        data,
        error,
        fetchNextPage,
        isFetchingNextPage,
        hasNextPage,
        isFetching,
    } = useInfiniteQuery({
        queryKey: ['InfinityScroll',name, top, randomIdnt, gener, genID],
        queryFn: ({ pageParam }) => fetchInf(pageParam, name, top, gener, genID),
        initialPageParam: 1,
        staleTime: 1000 * 60,
        getNextPageParam: (lastPage) => lastPage.pagination.has_next_page ? lastPage.pagination.current_page + 1 : undefined,
    })
    const { ref, inView } = useInView();
    useEffect(() => {
        if (!isFetchingNextPage && hasNextPage && inView) {
            setTimeout(() => {
                fetchNextPage()
            }, 1500);
        }
    }, [fetchNextPage, hasNextPage, inView, isFetchingNextPage])



    if (isFetching && !data) {
        return <div>
            <Spinner />
        </div>
    }

    if (error) {
        return <Error />
    }

    const fetchData = data?.pages.flatMap(item => item.data)
    return (
        <div>
            <Masonry
                breakpointCols={breakpointColumns}
                className="flex gap-4"
                columnClassName="bg-transparent"
            >
                {
                    name === 'animeData' ?
                        fetchData?.map((item: Anime) => {
                            return <AnimeCard data={item} key={item.mal_id} />
                        }) : fetchData?.map((item: Manga) => {
                            return <MangaCard data={item} key={item.mal_id} />
                        })
                }
            </Masonry>
            <div ref={ref} className='mt-3'>
                <Spinner />
            </div>
            <div className='min-h-[50px]' ></div>
        </div>
    );
};

export default InfinityScroll;