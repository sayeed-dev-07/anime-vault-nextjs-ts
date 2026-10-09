import SearchFetch from '@/components/SearchFetch';

const Page = async ({ searchParams }: { searchParams: Promise<{ name: string }> }) => {
    const { name } = await searchParams;

    return (
        <div className="max-w-[1600px]  min-h-screen pt-8  pb-24">

            {/* Editorial Page Header */}
            <header className="mb-16 border-b-2 border-border pb-6">
                <p className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground mb-4">
                    [ Search Results ]
                </p>
                <h1 className="text-4xl md:text-6xl lg:text-[5rem] font-black uppercase tracking-tighter text-foreground leading-[0.85] mb-6 flex flex-col md:flex-row md:items-end gap-2 md:gap-6">
                    Looking For
                    <span className="text-[crimson]">&quot;{name}&quot;</span>
                </h1>
                <p className="  text-xs md:text-sm tracking-widest uppercase text-muted-foreground">
                    Exploring the anime and manga catalogs.
                </p>
            </header>

            <main className="flex flex-col gap-16 md:gap-24">
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