import Image from 'next/image';
import ReadMoreText from './ReadMoreText';
import { getRecAndCharData } from './Fetch';
import Pagination from './Pagination';
import { 
    Star, Trophy, TrendingUp, Heart, Calendar, 
    Book, Activity, Info, Users, PenTool, Newspaper, Tags 
} from "lucide-react";

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
        <div className="max-w-[1400px] py-3 lg:py-5 mx-auto  px-4 sm:px-6 overflow-x-hidden">
            
            {/* --- Hero Section --- */}
            <div className="flex flex-col lg:flex-row gap-6 lg:gap-12 items-center lg:items-start">
                
                {/* Left: Cover Image */}
                <div className="w-[200px] sm:w-[260px] lg:w-[320px] shrink-0 mx-auto lg:mx-0">
                    {manga.images.jpg.large_image_url && (
                        <div className="relative aspect-[2/3] w-full rounded-2xl overflow-hidden shadow-2xl border border-border">
                            <Image
                                src={manga.images.jpg.large_image_url}
                                fill
                                sizes="(max-width: 768px) 260px, 320px"
                                alt={manga.title}
                                className="object-cover"
                                priority
                            />
                        </div>
                    )}
                </div>

                {/* Right: Titles and Main Stats */}
                <div className="flex flex-col gap-6 w-full flex-1 text-left">
                    
                    {/* Titles */}
                    <div className="mt-4 lg:mt-0">
                        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-foreground tracking-tight mb-2">
                            {manga.title}
                        </h1>
                        <div className="flex flex-col gap-1 text-sm sm:text-base text-muted-foreground font-medium">
                            {manga.title_english && <p>English: {manga.title_english}</p>}
                            {manga.title_japanese && <p>Japanese: {manga.title_japanese}</p>}
                            {manga.title_synonyms.length > 0 && (
                                <p className="line-clamp-2" title={manga.title_synonyms.join(", ")}>
                                    Synonyms: {manga.title_synonyms.join(", ")}
                                </p>
                            )}
                        </div>
                    </div>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 lg:gap-4 mt-2">
                        <div className="bg-secondary/60 p-3 lg:p-4 rounded-xl flex flex-col items-center text-center justify-center border border-border/50">
                            <Star className="w-5 h-5 lg:w-6 lg:h-6 text-yellow-500 mb-1 lg:mb-2" />
                            <span className="text-[10px] lg:text-sm text-muted-foreground font-semibold uppercase tracking-wider">Score</span>
                            <span className="text-lg lg:text-xl font-bold text-foreground">{manga.score ? manga.score : 'N/A'}</span>
                            <span className="text-[10px] text-muted-foreground mt-0.5">{manga.scored_by ? manga.scored_by.toLocaleString() : '0'} users</span>
                        </div>
                        <div className="bg-secondary/60 p-3 lg:p-4 rounded-xl flex flex-col items-center text-center justify-center border border-border/50">
                            <Trophy className="w-5 h-5 lg:w-6 lg:h-6 text-amber-600 mb-1 lg:mb-2" />
                            <span className="text-[10px] lg:text-sm text-muted-foreground font-semibold uppercase tracking-wider">Rank</span>
                            <span className="text-lg lg:text-xl font-bold text-foreground">#{manga.rank ? manga.rank : '?'}</span>
                        </div>
                        <div className="bg-secondary/60 p-3 lg:p-4 rounded-xl flex flex-col items-center text-center justify-center border border-border/50">
                            <TrendingUp className="w-5 h-5 lg:w-6 lg:h-6 text-emerald-500 mb-1 lg:mb-2" />
                            <span className="text-[10px] lg:text-sm text-muted-foreground font-semibold uppercase tracking-wider">Popularity</span>
                            <span className="text-lg lg:text-xl font-bold text-foreground">#{manga.popularity ? manga.popularity : '?'}</span>
                        </div>
                        <div className="bg-secondary/60 p-3 lg:p-4 rounded-xl flex flex-col items-center text-center justify-center border border-border/50">
                            <Heart className="w-5 h-5 lg:w-6 lg:h-6 text-[crimson] mb-1 lg:mb-2" />
                            <span className="text-[10px] lg:text-sm text-muted-foreground font-semibold uppercase tracking-wider">Favorites</span>
                            <span className="text-lg lg:text-xl font-bold text-foreground">{manga.favorites ? manga.favorites.toLocaleString() : '0'}</span>
                        </div>
                    </div>

                </div>
            </div>

            <div className="w-full h-px bg-border my-8 lg:my-10" />

            {/* --- Info & Tags Section --- */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-16">
                
                {/* Left Column: Info Grid */}
                <div className="lg:col-span-1 space-y-4 bg-secondary/30 p-5 lg:p-6 rounded-2xl border border-border/50 h-fit">
                    <h2 className="text-lg lg:text-xl font-bold flex items-center gap-2 mb-2 lg:mb-4">
                        <Info className="w-5 h-5 text-[crimson]" /> Information
                    </h2>
                    
                    <ul className="space-y-3 lg:space-y-4 text-sm sm:text-base">
                        <li className="flex justify-between items-center border-b border-border/50 pb-2">
                            <span className="text-muted-foreground font-medium flex items-center gap-2"><Book className="w-4 h-4"/> Type</span>
                            <span className="font-semibold text-right">{manga.type ? manga.type : '?'}</span>
                        </li>
                        <li className="flex justify-between items-center border-b border-border/50 pb-2">
                            <span className="text-muted-foreground font-medium flex items-center gap-2"><Book className="w-4 h-4"/> Volumes</span>
                            <span className="font-semibold text-right">{manga.volumes ?? '?'}</span>
                        </li>
                        <li className="flex justify-between items-center border-b border-border/50 pb-2">
                            <span className="text-muted-foreground font-medium flex items-center gap-2"><Book className="w-4 h-4"/> Chapters</span>
                            <span className="font-semibold text-right">{manga.chapters ?? '?'}</span>
                        </li>
                        <li className="flex justify-between items-center border-b border-border/50 pb-2">
                            <span className="text-muted-foreground font-medium flex items-center gap-2"><Activity className="w-4 h-4"/> Status</span>
                            <span className="font-semibold text-right">{manga.status ?? '?'}</span>
                        </li>
                        <li className="flex justify-between items-center border-b border-border/50 pb-2">
                            <span className="text-muted-foreground font-medium flex items-center gap-2"><Activity className="w-4 h-4"/> Publishing</span>
                            <span className="font-semibold text-right">{manga.publishing ? "Yes" : "No"}</span>
                        </li>
                        <li className="flex justify-between items-center border-b border-border/50 pb-2">
                            <span className="text-muted-foreground font-medium flex items-center gap-2"><Calendar className="w-4 h-4"/> Published</span>
                            <span className="font-semibold text-right max-w-[140px] truncate">{manga.published.string ?? '?'}</span>
                        </li>
                        {manga.demographics.length > 0 && (
                            <li className="flex justify-between items-center border-b border-border/50 pb-2">
                                <span className="text-muted-foreground font-medium flex items-center gap-2"><Users className="w-4 h-4"/> Demo</span>
                                <span className="font-semibold text-right">{manga.demographics[0].name}</span>
                            </li>
                        )}
                    </ul>
                </div>

                {/* Right Column: Synopsis, Background, Tags */}
                <div className="lg:col-span-2 space-y-8 lg:space-y-10">
                    
                    {/* Badges / Tags */}
                    <div className="space-y-5 lg:space-y-6">
                        {Allgenres.length > 0 && (
                            <div>
                                <h3 className="text-[11px] lg:text-sm font-bold uppercase tracking-wider text-muted-foreground mb-2 lg:mb-3 flex items-center gap-2">
                                    <Tags className="w-4 h-4"/> Genres & Themes
                                </h3>
                                <div className="flex flex-wrap gap-2">
                                    {Allgenres.map((g) => (
                                        <span key={g.mal_id} className="bg-[crimson]/10 text-[crimson] font-semibold px-2.5 py-1 lg:px-3 rounded-full text-xs lg:text-sm">
                                            {g.name}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}
                        
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 lg:gap-6">
                            {manga.authors.length > 0 && (
                                <div>
                                    <h3 className="text-[11px] lg:text-sm font-bold uppercase tracking-wider text-muted-foreground mb-2 lg:mb-3 flex items-center gap-2">
                                        <PenTool className="w-4 h-4"/> Authors
                                    </h3>
                                    <div className="flex flex-wrap gap-2">
                                        {manga.authors.map((a) => (
                                            <span key={a.mal_id} className="bg-secondary text-secondary-foreground font-medium px-2.5 py-1 lg:px-3 rounded-full text-xs lg:text-sm border border-border">
                                                {a.name}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            )}
                            {manga.serializations.length > 0 && (
                                <div>
                                    <h3 className="text-[11px] lg:text-sm font-bold uppercase tracking-wider text-muted-foreground mb-2 lg:mb-3 flex items-center gap-2">
                                        <Newspaper className="w-4 h-4"/> Serialization
                                    </h3>
                                    <div className="flex flex-wrap gap-2">
                                        {manga.serializations.map((s) => (
                                            <span key={s.mal_id} className="bg-secondary text-secondary-foreground font-medium px-2.5 py-1 lg:px-3 rounded-full text-xs lg:text-sm border border-border">
                                                {s.name}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Synopsis */}
                    <div>
                        <h2 className="text-xl lg:text-2xl font-bold mb-3 lg:mb-4">Synopsis</h2>
                        {manga.synopsis ? (
                            <div className="text-sm sm:text-base lg:text-lg leading-relaxed text-muted-foreground">
                                <ReadMoreText text={manga.synopsis} maxChars={350} />
                            </div>
                        ) : (
                            <p className="text-sm sm:text-base lg:text-lg text-muted-foreground">No synopsis available.</p>
                        )}
                    </div>

                    {/* Background */}
                    {manga.background && (
                        <div>
                            <h2 className="text-xl lg:text-2xl font-bold mb-3 lg:mb-4">Background</h2>
                            <div className="text-sm sm:text-base lg:text-lg leading-relaxed text-muted-foreground">
                                <ReadMoreText text={manga.background} maxChars={250} />
                            </div>
                        </div>
                    )}
                </div>
            </div>

            <div className="w-full h-px bg-border my-8 lg:my-12" />

            {/* --- Additional Data & Pagination --- */}
            <div className="space-y-12 lg:space-y-16">
                
                {characterData.length > 0 && (
                    <section>
                        <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-4 lg:mb-6">Characters</h2>
                        <Pagination name='animes' data={characterData} type="characters" limit={8} />
                    </section>
                )}

                {recommendationsData.length > 0 && (
                    <section>
                        <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-4 lg:mb-6">More Like This Manga</h2>
                        <Pagination name='mangas' data={recommendationsData} type="recommendations" limit={8} />
                    </section>
                )}
                
            </div>
        </div>
    );
};

export default CardDetailsMnga;