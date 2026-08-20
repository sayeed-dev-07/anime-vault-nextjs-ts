import Image from "next/image";
import ReadMoreText from "./ReadMoreText";
import { batchFetchAnimeData } from "./Fetch";
import Pagination from "./Pagination";
import { 
    Star, Trophy, TrendingUp, Heart, Calendar, 
    Tv, Clock, Info, PlayCircle, Film, Building2, Tags 
} from "lucide-react";

// ... [Keep all your existing TypeScript Interfaces here exactly as they are] ...

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
    const { characters, staff, recommendations } = await batchFetchAnimeData(anime.mal_id);
    const Allgenres = [...anime?.genres, ...anime?.themes];

    return (
        <div className="max-w-[1400px] mx-auto py-3 lg:py-5  sm:px-6">
            
            {/* --- Hero Section --- */}
            <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
                
                {/* Left: Cover Image */}
                <div className="shrink-0 mx-auto lg:mx-0 w-64 sm:w-72 lg:w-[320px]">
                    {anime.images.jpg.large_image_url && (
                        <div className="relative aspect-[2/3] w-full rounded-2xl overflow-hidden shadow-2xl border border-border">
                            <Image
                                src={anime.images.jpg.large_image_url}
                                fill
                                sizes="(max-width: 768px) 100vw, 320px"
                                loading="eager"
                                alt={anime.title}
                                className="object-cover"
                            />
                        </div>
                    )}
                </div>

                {/* Right: Titles and Main Stats */}
                <div className="flex flex-col gap-6 w-full flex-1">
                    
                    {/* Titles */}
                    <div>
                        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-foreground tracking-tight mb-2">
                            {anime.title}
                        </h1>
                        <div className="flex flex-col gap-1 text-sm sm:text-base text-muted-foreground font-medium">
                            {anime.title_english && <p>English: {anime.title_english}</p>}
                            {anime.title_japanese && <p>Japanese: {anime.title_japanese}</p>}
                            {anime.title_synonyms.length > 0 && (
                                <p className="truncate" title={anime.title_synonyms.join(", ")}>
                                    Synonyms: {anime.title_synonyms.join(", ")}
                                </p>
                            )}
                        </div>
                    </div>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-2">
                        <div className="bg-secondary/60 p-4 rounded-xl flex flex-col items-center text-center justify-center border border-border/50">
                            <Star className="w-6 h-6 text-yellow-500 mb-2" />
                            <span className="text-sm text-muted-foreground font-semibold uppercase tracking-wider">Score</span>
                            <span className="text-xl font-bold text-foreground">{anime.score ? anime.score : 'N/A'}</span>
                            <span className="text-[11px] text-muted-foreground mt-0.5">{anime.scored_by ? anime.scored_by.toLocaleString() : '0'} users</span>
                        </div>
                        <div className="bg-secondary/60 p-4 rounded-xl flex flex-col items-center text-center justify-center border border-border/50">
                            <Trophy className="w-6 h-6 text-amber-600 mb-2" />
                            <span className="text-sm text-muted-foreground font-semibold uppercase tracking-wider">Rank</span>
                            <span className="text-xl font-bold text-foreground">#{anime.rank ? anime.rank : '?'}</span>
                        </div>
                        <div className="bg-secondary/60 p-4 rounded-xl flex flex-col items-center text-center justify-center border border-border/50">
                            <TrendingUp className="w-6 h-6 text-emerald-500 mb-2" />
                            <span className="text-sm text-muted-foreground font-semibold uppercase tracking-wider">Popularity</span>
                            <span className="text-xl font-bold text-foreground">#{anime.popularity ? anime.popularity : '?'}</span>
                        </div>
                        <div className="bg-secondary/60 p-4 rounded-xl flex flex-col items-center text-center justify-center border border-border/50">
                            <Heart className="w-6 h-6 text-[crimson] mb-2" />
                            <span className="text-sm text-muted-foreground font-semibold uppercase tracking-wider">Favorites</span>
                            <span className="text-xl font-bold text-foreground">{anime.favorites ? anime.favorites.toLocaleString() : '0'}</span>
                        </div>
                    </div>

                </div>
            </div>

            <div className="w-full h-px bg-border my-10" />

            {/* --- Info & Tags Section --- */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 lg:gap-16">
                
                {/* Left Column: Info Grid */}
                <div className="lg:col-span-1 space-y-6 bg-secondary/30 p-6 rounded-2xl border border-border/50 h-fit">
                    <h2 className="text-xl font-bold flex items-center gap-2 mb-4">
                        <Info className="w-5 h-5 text-[crimson]" /> Information
                    </h2>
                    
                    <ul className="space-y-4 text-sm sm:text-base">
                        <li className="flex justify-between items-center border-b border-border/50 pb-2">
                            <span className="text-muted-foreground font-medium flex items-center gap-2"><Tv className="w-4 h-4"/> Type</span>
                            <span className="font-semibold">{anime.type ? anime.type : '?'}</span>
                        </li>
                        <li className="flex justify-between items-center border-b border-border/50 pb-2">
                            <span className="text-muted-foreground font-medium flex items-center gap-2"><Film className="w-4 h-4"/> Episodes</span>
                            <span className="font-semibold">{anime.episodes ? anime.episodes : '?'}</span>
                        </li>
                        <li className="flex justify-between items-center border-b border-border/50 pb-2">
                            <span className="text-muted-foreground font-medium flex items-center gap-2"><PlayCircle className="w-4 h-4"/> Status</span>
                            <span className="font-semibold">{anime.status ? anime.status : '?'}</span>
                        </li>
                        <li className="flex justify-between items-center border-b border-border/50 pb-2">
                            <span className="text-muted-foreground font-medium flex items-center gap-2"><Clock className="w-4 h-4"/> Duration</span>
                            <span className="font-semibold">{anime.duration ? anime.duration : '?'}</span>
                        </li>
                        <li className="flex justify-between items-center border-b border-border/50 pb-2">
                            <span className="text-muted-foreground font-medium flex items-center gap-2"><Calendar className="w-4 h-4"/> Aired</span>
                            <span className="font-semibold text-right max-w-[150px]">{anime.aired.string ? anime.aired.string : '?'}</span>
                        </li>
                        <li className="flex justify-between items-center border-b border-border/50 pb-2">
                            <span className="text-muted-foreground font-medium flex items-center gap-2"><Calendar className="w-4 h-4"/> Season</span>
                            <span className="font-semibold capitalize">{anime.season ? `${anime.season} ${anime.year || ''}` : '?'}</span>
                        </li>
                    </ul>
                </div>

                {/* Right Column: Synopsis, Background, Tags */}
                <div className="lg:col-span-2 space-y-10">
                    
                    {/* Badges / Tags */}
                    <div className="space-y-6">
                        {Allgenres.length > 0 && (
                            <div>
                                <h3 className="text-sm font-bold uppercase tracking-wider text-muted-foreground mb-3 flex items-center gap-2">
                                    <Tags className="w-4 h-4"/> Genres & Themes
                                </h3>
                                <div className="flex flex-wrap gap-2">
                                    {Allgenres.map((g) => (
                                        <span key={g.mal_id} className="bg-[crimson]/10 text-[crimson] font-semibold px-3 py-1 rounded-full text-sm">
                                            {g.name}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}
                        
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            {anime.studios.length > 0 && (
                                <div>
                                    <h3 className="text-sm font-bold uppercase tracking-wider text-muted-foreground mb-3 flex items-center gap-2">
                                        <Building2 className="w-4 h-4"/> Studios
                                    </h3>
                                    <div className="flex flex-wrap gap-2">
                                        {anime.studios.map((s) => (
                                            <span key={s.mal_id} className="bg-secondary text-secondary-foreground font-medium px-3 py-1 rounded-full text-sm border border-border">
                                                {s.name}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            )}
                            {anime.producers.length > 0 && (
                                <div>
                                    <h3 className="text-sm font-bold uppercase tracking-wider text-muted-foreground mb-3 flex items-center gap-2">
                                        <Building2 className="w-4 h-4"/> Producers
                                    </h3>
                                    <div className="flex flex-wrap gap-2">
                                        {anime.producers.map((p) => (
                                            <span key={p.mal_id} className="bg-secondary text-secondary-foreground font-medium px-3 py-1 rounded-full text-sm border border-border">
                                                {p.name}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Synopsis */}
                    {anime.synopsis && (
                        <div>
                            <h2 className="text-2xl font-bold mb-4">Synopsis</h2>
                            <div className="text-base sm:text-lg leading-relaxed text-muted-foreground">
                                <ReadMoreText text={anime.synopsis} maxChars={400} />
                            </div>
                        </div>
                    )}

                    {/* Background */}
                    {anime.background && (
                        <div>
                            <h2 className="text-2xl font-bold mb-4">Background</h2>
                            <div className="text-base sm:text-lg leading-relaxed text-muted-foreground">
                                <ReadMoreText text={anime.background} maxChars={300} />
                            </div>
                        </div>
                    )}
                </div>
            </div>

            <div className="w-full h-px bg-border my-12" />

            {/* --- Media & Additional Data --- */}
            <div className="space-y-16">
                
                {/* Trailer */}
                {anime.trailer.embed_url && (
                    <section>
                        <h2 className="text-2xl sm:text-3xl font-bold mb-6 flex items-center gap-2">
                            <PlayCircle className="w-7 h-7 text-[crimson]"/> Official Trailer
                        </h2>
                        <div className="w-full max-w-4xl rounded-2xl overflow-hidden border border-border shadow-lg">
                            <iframe
                                src={anime.trailer.embed_url}
                                className="w-full aspect-video"
                                allowFullScreen
                            />
                        </div>
                    </section>
                )}

                {/* Paginated Sections */}
                {characters.length > 0 && (
                    <section>
                        <h2 className="text-2xl sm:text-3xl font-bold mb-6">Characters</h2>
                        <Pagination data={characters} type="characters" limit={8} />
                    </section>
                )}

                {staff.length > 0 && (
                    <section>
                        <h2 className="text-2xl sm:text-3xl font-bold mb-6">Staff</h2>
                        <Pagination data={staff} type="staff" limit={8} />
                    </section>
                )}

                {recommendations.length > 0 && (
                    <section>
                        <h2 className="text-2xl sm:text-3xl font-bold mb-6">More Like This</h2>
                        <Pagination data={recommendations} type="recommendations" limit={8} />
                    </section>
                )}
                
            </div>
        </div>
    );
};

export default CardDetails;