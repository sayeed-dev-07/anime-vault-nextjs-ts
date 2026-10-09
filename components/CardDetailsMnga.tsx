import Image from 'next/image';
import ReadMoreText from './ReadMoreText';
import { getRecAndCharData } from './Fetch';
import Pagination from './Pagination';

// ... [Keep all your existing TypeScript Interfaces here exactly as they are] ...

export interface MangaResponse {
    data: MangaData;
}

export interface MangaData {
    mal_id: number;
    url: string;
    images: MangaImages;
    approved: boolean;
    titles: MangaTitle[];
    title: string;
    title_english: string | null;
    title_japanese: string | null;
    title_synonyms: string[];
    type: string | null;
    chapters: number | null;
    volumes: number | null;
    status: string | null;
    publishing: boolean;
    published: PublishedInfo;
    score: number | null;
    scored: number | null;
    scored_by: number | null;
    rank: number | null;
    popularity: number | null;
    members: number | null;
    favorites: number | null;
    synopsis: string | null;
    background: string | null;
    authors: MalEntity[];
    serializations: MalEntity[];
    genres: MalEntity[];
    explicit_genres: MalEntity[];
    themes: MalEntity[];
    demographics: MalEntity[];
}

export interface MangaImages {
    jpg: MangaImageSet;
    webp: MangaImageSet;
}

export interface MangaImageSet {
    image_url: string | null;
    small_image_url: string | null;
    large_image_url: string | null;
}

export interface MangaTitle {
    type: string;
    title: string;
}

export interface PublishedInfo {
    from: string | null;
    to: string | null;
    prop: PublishedProp;
    string: string | null;
}

export interface PublishedProp {
    from: PublishedDate;
    to: PublishedDate;
}

export interface PublishedDate {
    day: number | null;
    month: number | null;
    year: number | null;
}

export interface MalEntity {
    mal_id: number;
    type: string;
    name: string;
    url: string;
}

const CardDetailsMnga = async ({ manga }: { manga: MangaData }) => {
    const Allgenres = [
        ...(manga.genres ?? []),
        ...(manga.themes ?? [])
    ];

    const characterData = await getRecAndCharData('manga', manga.mal_id, 'characters');
    const recommendationsData = await getRecAndCharData('manga', manga.mal_id, 'recommendations');

    return (
        <div className="w-full min-h-screen bg-background text-foreground pb-24 pt-8 md:pt-16">
            <div className="max-w-[1400px] mx-auto  sm:px-6 md:px-12">

                {/* --- Editorial 3-Column Layout --- */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-0">

                    {/* Left Column: Image & Main Title */}
                    <div className="lg:col-span-5 lg:pr-12">
                        <div className="w-full max-w-[350px] aspect-[4/5] relative mb-8 bg-muted">
                            {manga.images?.jpg?.large_image_url ? (
                                <Image
                                    src={manga.images.jpg.large_image_url}
                                    fill
                                    sizes="(max-width: 1024px) 100vw, 40vw"
                                    loading="eager"
                                    alt={manga.title}
                                    className="object-cover"
                                />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center text-muted-foreground text-sm">No Image Available</div>
                            )}
                        </div>

                        <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground mb-4 border-b border-border pb-2 inline-block">
                            Manga details
                        </p>

                        <h1 className="text-4xl md:text-5xl font-light tracking-tight leading-tight text-foreground mb-3">
                            {manga.title}
                        </h1>

                        <div className="text-sm text-muted-foreground font-medium flex flex-col gap-1">
                            {manga.title_japanese && <span>{manga.title_japanese}</span>}
                            {manga.title_english && <span className="opacity-70">{manga.title_english}</span>}
                        </div>
                        {/* 01: Synopsis */}
                        {manga.synopsis && (
                            <div className="flex items-start mt-6 mb-6">
                                <span className="text-2xl font-light text-muted-foreground w-12 shrink-0">01</span>
                                <div className="h-px bg-border w-10 mt-4 mr-6 shrink-0 hidden sm:block" />
                                <div className="flex-1 pt-1.5">
                                    <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] mb-4 text-foreground">Synopsis</h3>
                                    <div className="text-sm text-muted-foreground leading-relaxed">
                                        <ReadMoreText text={manga.synopsis} maxChars={280} />
                                    </div>
                                </div>
                            </div>
                        )}



                    </div>

                    {/* Middle Column: Numbered Content List */}
                    <div className="lg:col-span-5 lg:border-l lg:border-border lg:pl-12 pt-0">

                        {/* 03: Reception */}
                        <div className="flex items-start mb-6">
                            <span className="text-2xl font-light text-muted-foreground w-12 shrink-0">02</span>
                            <div className="h-px bg-border w-10 mt-4 mr-6 shrink-0 hidden sm:block" />
                            <div className="flex-1 pt-1.5">
                                <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] mb-4 text-foreground">Reception</h3>
                                <ul className="space-y-2 text-sm text-muted-foreground">
                                    <li className="flex justify-between border-b border-border/50 pb-1">
                                        <span>Score</span> <span className="text-foreground">{manga.score || 'N/A'}</span>
                                    </li>
                                    <li className="flex justify-between border-b border-border/50 pb-1">
                                        <span>Rank</span> <span className="text-foreground">#{manga.rank || '?'}</span>
                                    </li>
                                    <li className="flex justify-between border-b border-border/50 pb-1">
                                        <span>Favorites</span> <span className="text-foreground">{manga.favorites?.toLocaleString() || '0'}</span>
                                    </li>
                                </ul>
                            </div>
                        </div>

                        {/* 04: Background (Optional) */}
                        {manga.background && (
                            <div className="flex items-start mb-6">
                                <span className="text-2xl font-light text-muted-foreground w-12 shrink-0">03</span>
                                <div className="h-px bg-border w-10 mt-4 mr-6 shrink-0 hidden sm:block" />
                                <div className="flex-1 pt-1.5">
                                    <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] mb-4 text-foreground">Background</h3>
                                    <div className="text-sm text-muted-foreground leading-relaxed">
                                        <ReadMoreText text={manga.background} maxChars={150} />
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* 02: Technical Specs */}
                        <div className="flex items-start mb-6">
                            <span className="text-2xl font-light text-muted-foreground w-12 shrink-0">04</span>
                            <div className="h-px bg-border w-10 mt-4 mr-6 shrink-0 hidden sm:block" />
                            <div className="flex-1 pt-1.5">
                                <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] mb-4 text-foreground">Data File</h3>
                                <ul className="space-y-2 text-sm text-muted-foreground">
                                    <li className="flex justify-between border-b border-border/50 pb-1">
                                        <span>Format</span> <span className="text-foreground">{manga.type || '?'}</span>
                                    </li>
                                    <li className="flex justify-between border-b border-border/50 pb-1">
                                        <span>Volumes</span> <span className="text-foreground">{manga.volumes || '?'}</span>
                                    </li>
                                    <li className="flex justify-between border-b border-border/50 pb-1">
                                        <span>Chapters</span> <span className="text-foreground">{manga.chapters || '?'}</span>
                                    </li>
                                    <li className="flex justify-between border-b border-border/50 pb-1">
                                        <span>Status</span> <span className="text-foreground">{manga.status || '?'}</span>
                                    </li>
                                    <li className="flex justify-between border-b border-border/50 pb-1">
                                        <span>Published</span> <span className="text-foreground text-right max-w-[150px] truncate">{manga.published?.string || '?'}</span>
                                    </li>
                                </ul>
                            </div>
                        </div>


                        {/* 05: Credits & Tags */}
                        <div className="flex items-start mb-6">
                            <span className="text-2xl font-light text-muted-foreground w-12 shrink-0">{manga.background ? '05' : '04'}</span>
                            <div className="h-px bg-border w-10 mt-4 mr-6 shrink-0 hidden sm:block" />
                            <div className="flex-1 pt-1.5">
                                <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] mb-4 text-foreground">Credits & Tags</h3>

                                <div className="mb-4">
                                    <span className="block text-xs text-muted-foreground mb-1">Authors</span>
                                    <div className="text-sm text-foreground">
                                        {manga.authors?.map(a => a.name).join(', ') || 'Unknown'}
                                    </div>
                                </div>

                                <div className="mb-4">
                                    <span className="block text-xs text-muted-foreground mb-1">Serialization</span>
                                    <div className="text-sm text-foreground">
                                        {manga.serializations?.map(s => s.name).join(', ') || 'Unknown'}
                                    </div>
                                </div>

                                <div className="flex flex-wrap gap-2 mt-4">
                                    {Allgenres.map((g) => (
                                        <span key={g.mal_id} className="text-xs border border-border px-2 py-1 text-muted-foreground uppercase tracking-wider">
                                            {g.name}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>



                    </div>

                    {/* Right Column: Character Sidebar (Visible only on lg screens) */}
                    <div className="hidden lg:block lg:col-span-2 lg:pl-8">
                        <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] mb-6 text-foreground">Featured Characters</h3>
                        <div className="flex flex-col gap-4">

                            {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                            {characterData?.slice(0, 4).map((char: any) => (
                                <div key={char.character.mal_id} className="relative w-full aspect-square bg-muted">
                                    {char.character.images?.jpg?.image_url && (
                                        <Image
                                            src={char.character.images.jpg.image_url}
                                            fill
                                            alt={char.character.name}
                                            className="object-cover"
                                        />
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* --- Bottom Data (Sliders) --- */}
                <div className="w-full h-px bg-border my-24" />

                <div className="space-y-24">
                    {characterData?.length > 0 && (
                        <section>
                            <h2 className="text-2xl font-light tracking-tight mb-8">Characters</h2>
                            <Pagination name='mangas' data={characterData} type="characters" limit={8} />
                        </section>
                    )}

                    {recommendationsData?.length > 0 && (
                        <section>
                            <h2 className="text-2xl font-light tracking-tight mb-8">Recommendations</h2>
                            <Pagination name='mangas' data={recommendationsData} type="recommendations" limit={8} />
                        </section>
                    )}
                </div>

            </div>
        </div>
    );
};

export default CardDetailsMnga;