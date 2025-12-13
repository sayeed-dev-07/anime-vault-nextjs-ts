
import Link from 'next/link';
import { Anime } from './FetchAnime';
import Image from 'next/image';

import FormatSegment from './Format';
import ButtonSpin from './Button';



export const genreEmoji: Record<string, string> = {
    "Action": "⚔️",
    "Adventure": "🧭",
    "Avant Garde": "🎨",
    "Award Winning": "🏆",
    "Boys Love": "💙",
    "Comedy": "😂",
    "Drama": "🎭",
    "Fantasy": "🔮",
    "Girls Love": "💖",
    "Gourmet": "🍣",
    "Horror": "👻",
    "Mystery": "🕵️‍♂️",
    "Romance": "❤️",
    "Sci-Fi": "🚀",
    "Slice of Life": "☕",
    "Sports": "🏀",
    "Supernatural": "👁️",
    "Suspense": "⏳",
    "Ecchi": "😳",
    "Erotica": "🔥",
    "Hentai": "😈",
    "Adult Cast": "👔",
    "Anthropomorphic": "🐾",
    "CGDCT": "🎀",
    "Childcare": "🍼",
    "Combat Sports": "🥊",
    "Crossdressing": "👗",
    "Delinquents": "😎",
    "Detective": "🔍",
    "Educational": "📚",
    "Gag Humor": "🤣",
    "Gore": "🩸",
    "Harem": "👑",
    "High Stakes Game": "🎲",
    "Historical": "🏯",
    "Idols (Female)": "🎤",
    "Idols (Male)": "🎙️",
    "Isekai": "🌀",
    "Iyashikei": "🍃",
    "Love Polygon": "💞",
    "Magical Sex Shift": "🪄",
    "Mahou Shoujo": "✨",
    "Martial Arts": "🥋",
    "Mecha": "🤖",
    "Medical": "🏥",
    "Military": "👮‍♂️",
    "Music": "🎶",
    "Mythology": "🐉",
    "Organized Crime": "🔫",
    "Otaku Culture": "🎌",
    "Parody": "🤡",
    "Performing Arts": "🎭",
    "Pets": "🐶",
    "Psychological": "🧠",
    "Racing": "🏎️",
    "Reincarnation": "♻️",
    "Reverse Harem": "💍",
    "Love Status Quo": "💬",
    "Samurai": "🗡️",
    "School": "🎒",
    "Showbiz": "🎬",
    "Space": "🌌",
    "Strategy Game": "♟️",
    "Super Power": "💥",
    "Survival": "🔥",
    "Team Sports": "🏆",
    "Time Travel": "⏱️",
    "Vampire": "🧛‍♂️",
    "Video Game": "🎮",
    "Visual Arts": "🖌️",
    "Workplace": "🏢",
    "Urban Fantasy": "🏙️✨",
    "Villainess": "👑🖤",
    "Josei": "🌸",
    "Kids": "🧸",
    "Seinen": "🎴",
    "Shoujo": "💐",
    "Shounen": "⚔️"
};





const AnimeCard = ({ data }: { data: Anime }) => {

    const genData = [...data.genres, ...data.themes]
    return (
        <div className='bg-chatgpt-card border border-[#b3b3b3] ease-linear will-change-auto duration-200 group rounded-xl mb-3 p-2 shadow-md  hover:shadow-xl  transition-all'>
            <div style={{backgroundImage: "linear-gradient(rgba(23, 23, 23, 0.1), rgb(23, 23, 23) 70%)", backgroundSize: "cover"}} className="relative  w-full aspect-4/4 overflow-hidden sm:aspect-3/5">
                {
                    data.images.jpg.large_image_url ? <Image
                        src={data.images.jpg.large_image_url}
                        sizes='100vw aspect-4/4'
                        alt="img"
                        fill loading="eager"
                        className="object-cover rounded-t-xl duration-200 group-hover:scale-105 transition-all  will-change-auto  group-hover:grayscale-0 grayscale-70"
                    /> : <p>No img FOund</p>
                }
            </div>

            <div className='flex items-center justify-between px-2 gap-y-2 mt-3 '>
                <div className='flex gap-x-2 gap-y-3 flex-col'>
                    <p className='text-xl'>{data.title}</p>
                    <p className='px-2 w-fit rounded-md py-0.5 bg-[#22333b] text-white'>❤️{data.favorites}</p>
                </div>

                <div className='flex items-center justify-center flex-col gap-y-3'>
                    <p className='px-2 w-fit rounded-md py-0.5 bg-[#306983] text-white'>⭐{data.score}</p>
                    <p className='px-2 w-fit rounded-md py-0.5 bg-[#19790c] text-white text-center text-nowrap'>📺{data.type}</p>
                </div>
            </div>
            <div className='flex items-center flex-wrap justify-center my-4 gap-2'>
                {
                    genData.map((item) => <p className='text-nowrap p-2 border rounded-md' key={item.mal_id}>{genreEmoji[item.name] ?? "🎬"} {item.name}</p>)
                }
            </div>

            <div>

                <div className='flex items-center mt-3 justify-center'>
                    
                        <Link href={`/animes/${FormatSegment(data.title)}-${data.mal_id}`}>
                        <ButtonSpin/>
                        </Link>
                    
                </div>

            </div>
        </div>
    );
};

export default AnimeCard;