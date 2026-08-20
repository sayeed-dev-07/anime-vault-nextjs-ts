import SearchFetch from '@/components/SearchFetch';
import { Search } from 'lucide-react';

const Page = async ({ searchParams }: { searchParams: Promise<{ name: string }> }) => {
    const { name } = await searchParams;
    
    return (
        <div className="max-w-[1600px] mx-auto py-8 md:py-12 px-4 sm:px-6 min-h-screen">
            
            {/* Page Header */}
            <header className="mb-10 md:mb-16 border-b border-border pb-6 md:pb-8">
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold flex items-center gap-3 sm:gap-4 tracking-tight text-foreground">
                    <Search className="w-8 h-8 sm:w-10 sm:h-10 text-[crimson]" />
                    <span>
                        Results for <span className="text-[crimson]">&quot;{name}&quot;</span>
                    </span>
                </h1>
                <p className="text-muted-foreground mt-3 text-base sm:text-lg">
                    Browse the top anime and manga matching your search query.
                </p>
            </header>

            <main className="flex flex-col gap-16">
                {/* Anime Results */}
                <section className="w-full">
                    <SearchFetch searchName={name} name="search-anime" />
                </section>

                {/* Manga Results */}
                <section className="w-full">
                    <SearchFetch searchName={name} name="search-manga" />
                </section>
            </main>
            
        </div>
    );
};

export default Page;