'use client'
import { useInfiniteQuery } from '@tanstack/react-query'

import Error from './Error';

import Spinner from './Spinner';

import { Anime } from './FetchAnime';
import { Manga } from './FetchAnime';
import Masonry from 'react-masonry-css';
import { PageFetch } from './PageFetch';

import AnimeCard from './AnimeCard';
import MangaCard from './MangaCard';
import { Button } from './ui/button';



const breakpointColumns = {
    default: 4,
    1250: 3,
    768: 2,
    480: 1,
};

export type randomIdntProp = 'search-anime' | 'search-manga'
interface PageProp {
    name?: randomIdntProp,
    searchName: string
}



const SearchFetch = ({ name = 'search-anime', searchName }: PageProp) => {


    const {
        data,
        error,
        fetchNextPage,
        isFetchingNextPage,
        hasNextPage,
        isFetching,
    } = useInfiniteQuery({
        queryKey: ['pagination', name, searchName],
        queryFn: ({ pageParam }) => PageFetch(pageParam, name, searchName),
        initialPageParam: 1,
        staleTime: 1000 * 60 * 5,
        getNextPageParam: (lastPage) => lastPage.pagination.has_next_page ? lastPage.pagination.current_page + 1 : undefined,
    })


    function handleClick() {
        if (hasNextPage && !isFetchingNextPage) {
            fetchNextPage()
        }
    }

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

        <div className={`${name === 'search-anime' ? '' : 'mt-10'}`}>
            <p className='sm:text-4xl text-2xl mb-3'>{name === 'search-anime' ? 'Anime' : 'Manga'} :</p>
            {
                fetchData?.length === 0 ? (<div className='w-full min-h-[20vh] flex items-center justify-center text-2xl'>
                    <p>No data found</p>
                </div>) : (<>
                    <div>
                        <Masonry
                            breakpointCols={breakpointColumns}
                            className="flex gap-4"
                            columnClassName="bg-transparent"
                        >
                            {
                                name === 'search-anime' ?
                                    fetchData?.map((item: Anime) => <AnimeCard key={item.mal_id} data={item} />) : fetchData?.map((item: Manga) => <MangaCard key={item.mal_id} data={item} />)
                            }
                        </Masonry>
                        {
                            hasNextPage && <div className='mt-3 w-full flex items-center justify-center'>
                                <div onClick={handleClick} className=''>
                                    <Button className='cursor-pointer'>
                                        Load More
                                    </Button>
                                </div>
                            </div>
                        }
                        <div className='min-h-[50px]' ></div>
                    </div>
                    <div>

                    </div>
                </>)
            }
        </div>
    );
};

export default SearchFetch;