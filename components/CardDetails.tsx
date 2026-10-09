import Image from "next/image";
import ReadMoreText from "./ReadMoreText";
import { batchFetchAnimeData } from "./Fetch";
import Pagination from "./Pagination";
import { PlayCircle } from "lucide-react";

export interface AnimeResponse {
    data: AnimeData;
}

export interface AnimeData {
    mal_id: number;
    url: string;
    images: AnimeImages;
    trailer: AnimeTrailer;
    approved: boolean;
    titles: AnimeTitle[] | [];
    title: string;
    title_english: string | null;
    title_japanese: string | null;
    title_synonyms: string[];
    type: string | null;
    source: string | null;
    episodes: number | null;
    status: string | null;
    airing: boolean;
    aired: AiredInfo;
    duration: string | null;
    rating: string | null;
    score: number | null;
    scored_by: number | null;
    rank: number | null;
    popularity: number | null;
    members: number | null;
    favorites: number | null;
    synopsis: string | null;
    background: string | null;
    season: string | null;
    year: number | null;
    broadcast: BroadcastInfo | null;
    producers: MalEntity[];
    licensors: MalEntity[];
    studios: MalEntity[];
    genres: MalEntity[];
    explicit_genres: MalEntity[];
    themes: MalEntity[];
    demographics: MalEntity[];
}

/* Images */
export interface AnimeImages {
    jpg: ImageSet;
    webp: ImageSet;
}

export interface ImageSet {
    image_url: string | null;
    small_image_url: string | null;
    large_image_url: string | null;
}

/* Trailer */
export interface AnimeTrailer {
    youtube_id: string | null;
    url: string | null;
    embed_url: string | null;
    images: TrailerImages;
}

export interface TrailerImages {
    image_url: string | null;
    small_image_url: string | null;
    medium_image_url: string | null;
    large_image_url: string | null;
    maximum_image_url: string | null;
}

/* Titles */
export interface AnimeTitle {
    type: string;
    title: string;
}

/* Aired info */
export interface AiredInfo {
    from: string | null;
    to: string | null;
    prop: AiredProp;
    string: string | null;
}

export interface AiredProp {
    from: AiredDate;
    to: AiredDate;
}

export interface AiredDate {
    day: number | null;
    month: number | null;
    year: number | null;
}

/* Broadcast */
export interface BroadcastInfo {
    day: string | null;
    time: string | null;
    timezone: string | null;
    string: string | null;
}

/* Producers, studios, genres, etc. */
export interface MalEntity {
    mal_id: number;
    type: string;
    name: string;
    url: string;
}

const CardDetails = async ({ anime }: { anime: AnimeData }) => {
    // Explicitly typing the fetched data based on Jikan API structure for characters
    const { characters, staff, recommendations } = await batchFetchAnimeData(anime.mal_id);
    const Allgenres = [...(anime?.genres || []), ...(anime?.themes || [])];

    return (
        <div className="w-full min-h-screen bg-background text-foreground pb-24 pt-8 md:pt-16">
            <div className="max-w-[1400px] mx-auto  sm:px-6 md:px-12">

                {/* --- Editorial 3-Column Layout --- */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-0">

                    {/* Left Column: Image & Main Title */}
                    <div className="lg:col-span-5 lg:pr-12">
                        <div className="w-full max-w-[350px] aspect-4/5 relative mb-8 bg-muted">
                            {anime.images?.jpg?.large_image_url ? (
                                <Image
                                    src={anime.images.jpg.large_image_url}
                                    fill
                                    sizes="(max-width: 1024px) 100vw, 40vw"
                                    loading="eager"
                                    alt={anime.title}
                                    className="object-cover  "
                                />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center text-muted-foreground text-sm">No Image Available</div>
                            )}
                        </div>

                        <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground mb-4 border-b border-border pb-2 inline-block">
                            anime info
                        </p>

                        <h1 className="text-4xl md:text-5xl font-light tracking-tight leading-tight text-foreground mb-3">
                            {anime.title}
                        </h1>

                        <div className="text-sm text-muted-foreground font-medium flex flex-col gap-1">
                            {anime.title_japanese && <span>{anime.title_japanese}</span>}
                            {anime.title_english && <span className="opacity-70">{anime.title_english}</span>}
                        </div>
                        {/* 01: Synopsis */}
                        {anime.synopsis && (
                            <div className="flex items-start my-6">
                                <span className="text-2xl font-light text-muted-foreground w-12 shrink-0">01</span>
                                <div className="h-px bg-border w-10 mt-4 mr-6 shrink-0 hidden sm:block" />
                                <div className="flex-1 pt-1.5">
                                    <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] mb-4 text-foreground">Synopsis</h3>
                                    <div className="text-sm text-muted-foreground leading-relaxed">
                                        <ReadMoreText text={anime.synopsis} maxChars={280} />
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Middle Column: Numbered Content List */}
                    <div className="lg:col-span-5 lg:border-l lg:border-border lg:pl-12 pt-4 lg:pt-0">



                        {/* 02: Technical Specs */}
                        <div className="flex items-start mb-6">
                            <span className="text-2xl font-light text-muted-foreground w-12 shrink-0">02</span>
                            <div className="h-px bg-border w-10 mt-4 mr-6 shrink-0 hidden sm:block" />
                            <div className="flex-1 pt-1.5">
                                <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] mb-4 text-foreground">Data File</h3>
                                <ul className="space-y-2 text-sm text-muted-foreground">
                                    <li className="flex justify-between border-b border-border/50 pb-1">
                                        <span>Format</span> <span className="text-foreground">{anime.type || '?'}</span>
                                    </li>
                                    <li className="flex justify-between border-b border-border/50 pb-1">
                                        <span>Episodes</span> <span className="text-foreground">{anime.episodes || '?'}</span>
                                    </li>
                                    <li className="flex justify-between border-b border-border/50 pb-1">
                                        <span>Status</span> <span className="text-foreground">{anime.status || '?'}</span>
                                    </li>
                                    <li className="flex justify-between border-b border-border/50 pb-1">
                                        <span>Aired</span> <span className="text-foreground">{anime.aired?.string || '?'}</span>
                                    </li>
                                </ul>
                            </div>
                        </div>

                        {/* 03: Reception */}
                        <div className="flex items-start mb-6">
                            <span className="text-2xl font-light text-muted-foreground w-12 shrink-0">03</span>
                            <div className="h-px bg-border w-10 mt-4 mr-6 shrink-0 hidden sm:block" />
                            <div className="flex-1 pt-1.5">
                                <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] mb-4 text-foreground">Reception</h3>
                                <ul className="space-y-2 text-sm text-muted-foreground">
                                    <li className="flex justify-between border-b border-border/50 pb-1">
                                        <span>Score</span> <span className="text-foreground">{anime.score || 'N/A'}</span>
                                    </li>
                                    <li className="flex justify-between border-b border-border/50 pb-1">
                                        <span>Rank</span> <span className="text-foreground">#{anime.rank || '?'}</span>
                                    </li>
                                    <li className="flex justify-between border-b border-border/50 pb-1">
                                        <span>Favorites</span> <span className="text-foreground">{anime.favorites?.toLocaleString() || '0'}</span>
                                    </li>
                                </ul>
                            </div>
                        </div>

                        {/* 04: Background (Optional) */}
                        {anime.background && (
                            <div className="flex items-start mb-6">
                                <span className="text-2xl font-light text-muted-foreground w-12 shrink-0">04</span>
                                <div className="h-px bg-border w-10 mt-4 mr-6 shrink-0 hidden sm:block" />
                                <div className="flex-1 pt-1.5">
                                    <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] mb-4 text-foreground">Background</h3>
                                    <div className="text-sm text-muted-foreground leading-relaxed">
                                        <ReadMoreText text={anime.background} maxChars={150} />
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* 05: Genres & Studios */}
                        <div className="flex items-start mb-6">
                            <span className="text-2xl font-light text-muted-foreground w-12 shrink-0">{anime.background ? '05' : '04'}</span>
                            <div className="h-px bg-border w-10 mt-4 mr-6 shrink-0 hidden sm:block" />
                            <div className="flex-1 pt-1.5">
                                <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] mb-4 text-foreground">Tags & Studios</h3>
                                <div className="flex flex-wrap gap-2 mb-3">
                                    {Allgenres.map((g) => (
                                        <span key={g.mal_id} className="text-xs border border-border px-2 py-1 text-muted-foreground uppercase tracking-wider">
                                            {g.name}
                                        </span>
                                    ))}
                                </div>
                                <div className="text-sm text-foreground">
                                    {anime.studios?.map(s => s.name).join(', ')}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Character Sidebar (Visible only on lg screens) */}
                    <div className="hidden lg:block lg:col-span-2 lg:pl-8">
                        <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] mb-6 text-foreground">Featured Characters</h3>
                        <div className="flex flex-col gap-4">

                            {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                            {characters?.slice(0, 4).map((char: any) => (
                                <div key={char.character.mal_id} className="relative w-full aspect-square bg-muted">
                                    {char.character.images?.jpg?.image_url && (
                                        <Image
                                            src={char.character.images.jpg.image_url}
                                            fill
                                            alt={char.character.name}
                                            className="object-cover "
                                        />
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* --- Bottom Data (Trailer & Sliders) --- */}
                {/* A clean horizontal rule separates the editorial section from the heavy media components */}
                <div className="w-full h-px bg-border my-24" />

                <div className="space-y-24">
                    {/* Trailer */}
                    {anime.trailer.embed_url && (
                        <section className="max-w-4xl mx-auto">
                            <h2 className="text-xs font-bold uppercase tracking-[0.2em] mb-6 flex items-center justify-center gap-2 text-foreground">
                                <PlayCircle className="w-4 h-4" /> Official Trailer
                            </h2>
                            <div className="w-full bg-muted relative aspect-video">
                                <iframe
                                    src={anime.trailer.embed_url}
                                    className="absolute inset-0 w-full h-full"
                                    allowFullScreen
                                />
                            </div>
                        </section>
                    )}

                    {/* Paginated Sections */}
                    {characters?.length > 0 && (
                        <section>
                            <h2 className="text-2xl font-light tracking-tight mb-8">Characters</h2>
                            <Pagination data={characters} type="characters" limit={8} />
                        </section>
                    )}

                    {staff?.length > 0 && (
                        <section>
                            <h2 className="text-2xl font-light tracking-tight mb-8">Staff</h2>
                            <Pagination data={staff} type="staff" limit={8} />
                        </section>
                    )}

                    {recommendations?.length > 0 && (
                        <section>
                            <h2 className="text-2xl font-light tracking-tight mb-8">Recommendations</h2>
                            <Pagination data={recommendations} type="recommendations" limit={8} />
                        </section>
                    )}
                </div>

            </div>
        </div>
    );
};

export default CardDetails;