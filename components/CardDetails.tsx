import Image from "next/image";
import ReadMoreText from "./ReadMoreText";


import { getRecAndCharData } from "./Fetch";

import Pagination from "./Pagination";

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



    const characterData = await getRecAndCharData('anime', anime.mal_id, 'characters')
    const recommendationsData = await getRecAndCharData('anime', anime.mal_id, 'recommendations')
    const staffDataRes = await fetch(`https://api.jikan.moe/v4/anime/${anime.mal_id}/staff`, {next: {revalidate: 86400}})
    const staffDataJson = await staffDataRes.json()
    const staffData = staffDataJson.data ?? []
    const Allgenres = [...anime?.genres, ...anime?.themes]
    return (
        <div className="max-w-7xl mx-auto py-10 px-4">
            {/* Header section */}
            <div className="flex flex-col md:flex-row gap-10">
                {/* Left: Cover image */}
                <div className="shrink-0">
                    {anime.images.jpg.large_image_url && (
                        <Image
                            src={anime.images.jpg.large_image_url}
                            width={320} loading="eager"
                            height={480}
                            alt={anime.title}
                            className="rounded-xl shadow-lg object-cover"
                        />
                    )}
                </div>

                {/* Right: Titles and score */}
                <div className="flex flex-col gap-4 w-full">
                    <h1 className="text-4xl font-bold">{anime.title}</h1>

                    <div className="space-y-2 text-lg">
                        {anime.title_english && (
                            <p>
                                ➤ <span className="font-semibold">English:</span>{" "}
                                {anime.title_english}
                            </p>
                        )}

                        {anime.title_japanese && (
                            <p>
                                ➤ <span className="font-semibold">Japanese:</span>{" "}
                                {anime.title_japanese}
                            </p>
                        )}

                        {anime.title_synonyms.length > 0 && (
                            <p>
                                ➤ <span className="font-semibold">Synonyms:</span>{" "}
                                {anime.title_synonyms.join(", ")}
                            </p>
                        )}
                    </div>

                    <div className="flex flex-wrap gap-5 text-lg">
                        <div>
                            ⭐ <span className="font-semibold">Score:</span> {anime.score ? anime.score : '?'}
                        </div>
                        <div>
                            🧮 <span className="font-semibold">Scored by:</span>{" "}
                            {anime.scored_by ? anime.scored_by : '?'}
                        </div>
                        <div>
                            🥇 <span className="font-semibold">Rank:</span> #{anime.rank ? anime.rank : '?'}
                        </div>
                        <div>
                            📈 <span className="font-semibold">Popularity:</span>{" "}
                            #{anime.popularity}
                        </div>
                        <div>
                            ❤️ <span className="font-semibold">Favorites:</span>{" "}
                            {anime.favorites}
                        </div>
                    </div>
                </div>
            </div>

            {/* Divider */}
            <div className="w-full h-px bg-gray-300 my-10" />

            {/* Grid of metadata */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 text-lg">
                <div className="space-y-3">
                    <p>
                        🎞️ <span className="font-semibold">Type:</span> {anime.type ? anime.type : '?'}
                    </p>
                    <p>
                        📚 <span className="font-semibold">Source:</span> {anime.source ? anime.source : '?'}
                    </p>
                    <p>
                        🔢 <span className="font-semibold">Episodes:</span>{" "}
                        {anime.episodes ? anime.episodes : '?'}
                    </p>
                    <p>
                        📡 <span className="font-semibold">Status:</span> {anime.status ? anime.status : '?'}
                    </p>
                    <p>
                        ⏱️ <span className="font-semibold">Duration:</span>{" "}
                        {anime.duration ? anime.duration : '?'}
                    </p>
                    <p>
                        🧩 <span className="font-semibold">Rating:</span> {anime.rating ? anime.rating : '?'}
                    </p>
                </div>

                <div className="space-y-3">
                    <p>
                        ⏳ <span className="font-semibold">Aired:</span>{" "}
                        {anime.aired.string ? anime.aired.string : '?'}
                    </p>
                    <p>
                        🍁 <span className="font-semibold">Season:</span> {anime.season ? anime.season : '?'}
                    </p>
                    <p>
                        📆 <span className="font-semibold">Year:</span> {anime.year ? anime.year : '?'}
                    </p>
                    <p>
                        🕒 <span className="font-semibold">BroadCast:</span>{" "}
                        {anime.broadcast?.string ? anime.broadcast.string : '?'}
                    </p>
                </div>
            </div>

            {/* Divider */}
            <div className="w-full h-px bg-gray-300 my-10" />

            {/* Genres, studios, producers */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10 text-lg">
                {
                    Allgenres.length > 0 ?
                        <div>
                            <h2 className="font-bold mb-2">🧩 Genres</h2>
                            <ul className="list-disc ml-5">
                                {Allgenres.map((g) => (
                                    <li key={g.mal_id}>{g.name}</li>
                                ))}
                            </ul>
                        </div> : ''
                }

                {
                    anime.producers.length > 0 ?
                        <div>
                            <h2 className="font-bold mb-2">🏭 Producers</h2>
                            <ul className="list-disc ml-5">
                                {anime.producers.map((p) => (
                                    <li key={p.mal_id}>{p.name}</li>
                                ))}
                            </ul>
                        </div> : ''
                }

                {
                    anime.studios.length > 0 ?
                        <div>
                            <h2 className="font-bold mb-2">🎥 Studios</h2>
                            <ul className="list-disc ml-5">
                                {anime.studios.map((s) => (
                                    <li key={s.mal_id}>{s.name}</li>
                                ))}
                            </ul>
                        </div> : ''
                }
            </div>

            {/* Divider */}
            <div className="w-full h-px bg-gray-300 my-10" />

            {/* Synopsis */}
            {
                anime.synopsis ? <div>
                    <h2 className="text-2xl font-bold mb-3">📖 Synopsis</h2>
                    <div className="text-lg leading-relaxed"><ReadMoreText text={anime.synopsis} maxChars={300} /></div>
                </div> : ''
            }

            {/* Background */}
            {anime.background && (
                <div className="mt-10">
                    <h2 className="text-2xl font-bold mb-3">🧾 Background</h2>
                    <div className="text-lg leading-relaxed"><ReadMoreText text={anime.background} maxChars={300} /></div>
                </div>
            )}

            {/* Trailer */}
            {anime.trailer.embed_url && (
                <div className="mt-10">
                    <h2 className="text-2xl font-bold mb-3">🎬 Trailer</h2>
                    <iframe
                        src={anime.trailer.embed_url}
                        className="w-full aspect-video rounded-xl border"
                        allowFullScreen
                    />
                </div>
            )}

            {
                characterData.length > 0 &&
                <div>

                    <p className="sm:text-4xl text-2xl font-bold mt-10">🌌 Characters :</p>

                   <Pagination data={characterData} name="characters" limit={8} />

                </div>
            }
            {
                staffData.length > 0 &&
                <div>

                    <p className="sm:text-4xl text-2xl font-bold mt-10">🧑‍💼 Staff :</p>

                    <Pagination data={staffData} name="staff" limit={8} />

                </div>
            }
            {
                recommendationsData.length > 0 && <div>

                    <p className="sm:text-4xl text-2xl font-bold sm:mt-12 mt-4">🌟 More Like This Anime :</p>

                    <Pagination data={recommendationsData} name="recommendations" limit={8} />
                </div>
            }

        </div>
    );
};

export default CardDetails;