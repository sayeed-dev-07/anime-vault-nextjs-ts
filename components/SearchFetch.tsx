'use client'

import { useInfiniteQuery } from '@tanstack/react-query';
import Error from './Error';
import Spinner from './Spinner';
import { Anime, Manga } from './FetchAnime';
import Masonry from 'react-masonry-css';
import { PageFetch } from './PageFetch';
import AnimeCard from './AnimeCard';
import MangaCard from './MangaCard';
import { Button } from './ui/button';
import { SearchX, ChevronDown } from 'lucide-react';

const breakpointColumns = {
    default: 4,
    1536: 3,
    1024: 2,
    640: 1,
};

export type randomIdntProp = 'search-anime' | 'search-manga';

interface PageProp {
    name?: randomIdntProp;
    searchName: string;
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
    });

    function handleClick() {
        if (hasNextPage && !isFetchingNextPage) {
            fetchNextPage();
        }
    }

    const isAnime = name === 'search-anime';
    const sectionTitle = isAnime ? 'Anime' : 'Manga';

    if (isFetching && !data) {
        return (
            <div className="w-full min-h-[30vh] flex flex-col items-center justify-center gap-4">
                <Spinner size="lg" />
                <p className="  text-xs tracking-[0.2em] uppercase text-muted-foreground animate-pulse">
                    Curating {sectionTitle}...
                </p>
            </div>
        );
    }

    if (error) {
        return <Error />;
    }

    const fetchData = data?.pages.flatMap(item => item.data);

    return (
        <div>
            {/* Minimalist Section Header */}
            <div className="flex items-end justify-between mb-8 border-b-[3px] border-border pb-4">
                <h2 className="text-xl sm:text-2xl uppercase text-foreground">
                    {sectionTitle} Collection
                </h2>
                {fetchData && (
                    <span className="  text-xs sm:text-sm tracking-[0.2em] text-muted-foreground">
                        [ {(data?.pages[0].pagination.items.total || 0).toString().padStart(2, '0')} found ]
                    </span>
                )}
            </div>

            {/* Content Area */}
            {fetchData?.length === 0 ? (
                // Brutalist Empty State
                <div className="comic-panel w-full flex flex-col items-center justify-center py-20 px-4 bg-card text-center">
                    <SearchX className="w-12 h-12 text-muted-foreground mb-6 opacity-40" />
                    <span className="  text-[10px] tracking-[0.2em] uppercase text-muted-foreground mb-2">
                        Blank Canvas
                    </span>
                    <h3 className="text-lg font-bold uppercase tracking-wider mb-4">
                        No {sectionTitle} Found
                    </h3>
                    <p className="text-xs font-medium text-muted-foreground max-w-sm uppercase tracking-widest leading-relaxed">
                        We couldn&apos;t locate any {sectionTitle.toLowerCase()} matching &quot;{searchName}&quot;. Try a different title.
                    </p>
                </div>
            ) : (
                <>
                    {/* Masonry Grid */}
                    <div className="items-start">
                        <Masonry
                            breakpointCols={breakpointColumns}
                            className="flex gap-3 sm:gap-5"
                            columnClassName="bg-transparent"
                        >
                            {isAnime
                                ? fetchData?.map((item: Anime) => <AnimeCard key={item.mal_id} data={item} />)
                                : fetchData?.map((item: Manga) => <MangaCard key={item.mal_id} data={item} />)
                            }
                        </Masonry>
                    </div>

                    {/* Brutalist Load More Button */}
                    {hasNextPage && (
                        <div className="mt-8 sm:mt-12 w-full flex items-center justify-center">
                            <Button
                                onClick={handleClick}
                                disabled={isFetchingNextPage}
                                className='
                                    cursor-pointer group flex items-center justify-center gap-3
                                    w-full sm:w-[300px] h-12 
                                    rounded-none border border-foreground bg-transparent text-foreground 
                                    transition-all duration-300 ease-out
                                    hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none shadow-[4px_4px_0_var(--foreground)] disabled:opacity-50
                                    uppercase tracking-[0.2em] text-[10px] font-bold
                                '
                            >
                                {isFetchingNextPage ? (
                                    <>
                                        <Spinner size="sm" className="text-current" /> Loading...
                                    </>
                                ) : (
                                    <>
                                        Expand Gallery <ChevronDown className="w-4 h-4 transition-transform duration-300 group-hover:translate-y-1" />
                                    </>
                                )}
                            </Button>
                        </div>
                    )}
                </>
            )}
        </div>
    );
};

export default SearchFetch;
