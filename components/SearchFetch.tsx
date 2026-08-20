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
import { Tv, Book, SearchX, ChevronDown } from 'lucide-react';

// Updated to standard Tailwind breakpoints
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
    const SectionIcon = isAnime ? Tv : Book;
    const sectionTitle = isAnime ? 'Anime' : 'Manga';

    // Initial Loading State
    if (isFetching && !data) {
        return (
            <div className="w-full min-h-[30vh] flex flex-col items-center justify-center gap-4">
                <Spinner size="lg" />
                <p className="text-muted-foreground font-medium animate-pulse">Searching {sectionTitle}...</p>
            </div>
        );
    }

    // Error State
    if (error) {
        return <Error />;
    }

    const fetchData = data?.pages.flatMap(item => item.data);

    return (
        <div>
            {/* Section Header */}
            <div className="flex items-center gap-3 mb-6 border-b border-border pb-4">
                <SectionIcon className={`w-6 h-6 sm:w-7 sm:h-7 ${isAnime ? 'text-blue-500' : 'text-emerald-500'}`} />
                <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">{sectionTitle}</h2>
                {fetchData && (
                    <span className="bg-secondary border border-border/50 text-muted-foreground px-3 py-0.5 rounded-full text-sm font-bold ml-2">
                        {data?.pages[0].pagination.items.total || 0} Results
                    </span>
                )}
            </div>

            {/* Content Area */}
            {fetchData?.length === 0 ? (
                // Premium Empty State
                <div className="flex flex-col items-center justify-center py-16 border-2 border-dashed border-border rounded-2xl bg-secondary/10 text-center">
                    <SearchX className="w-12 h-12 sm:w-16 sm:h-16 text-muted-foreground mb-4 opacity-40" />
                    <h3 className="text-xl sm:text-2xl font-bold mb-2">No {sectionTitle} Found</h3>
                    <p className="text-muted-foreground max-w-md">
                        We couldn&apos;t find any {sectionTitle.toLowerCase()} matching &quot;{searchName}&quot;. Try adjusting your keywords.
                    </p>
                </div>
            ) : (
                <>
                    {/* Masonry Grid (items-start ensures natural card heights) */}
                    <div className="items-start">
                        <Masonry
                            breakpointCols={breakpointColumns}
                            className="flex gap-4 sm:gap-6"
                            columnClassName="bg-transparent"
                        >
                            {isAnime
                                ? fetchData?.map((item: Anime) => <AnimeCard key={item.mal_id} data={item} />)
                                : fetchData?.map((item: Manga) => <MangaCard key={item.mal_id} data={item} />)
                            }
                        </Masonry>
                    </div>

                    {/* Load More Button Area */}
                    {hasNextPage && (
                        <div className="mt-8 sm:mt-12 w-full flex items-center justify-center">
                            <Button 
                                onClick={handleClick} 
                                disabled={isFetchingNextPage}
                                size="lg"
                                className="cursor-pointer gap-2 font-semibold px-8 h-12 bg-secondary text-secondary-foreground hover:bg-secondary/80 border border-border"
                            >
                                {isFetchingNextPage ? (
                                    <>
                                        <Spinner size="sm" /> Loading...
                                    </>
                                ) : (
                                    <>
                                        Load More <ChevronDown className="w-5 h-5" />
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