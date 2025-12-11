import React from 'react';
import { Manga } from './FetchAnime';
import Link from 'next/link';
import { Button } from './ui/button';
import Image from 'next/image';
import { genreEmoji } from './AnimeCard';


const MangaCard = ({ data }: { data: Manga }) => {
    const genData = [...data.genres, ...data.themes]
    return (
        <div className='bg-chatgpt-card border border-[#b3b3b3] mb-3 rounded-xl p-2  ease-linear will-change-auto duration-200 group hadow-md hover:shadow-xl  transition-all'>
            <div className="relative w-full aspect-4/4 overflow-hidden sm:aspect-3/5">
                {
                    data.images.jpg.large_image_url ? <Image
                        src={data.images.jpg.large_image_url}
                        loading="eager"
                        sizes='100vw 100vh'
                        alt="img"
                        fill
                        className="object-cover rounded-t-xl duration-200 will-change-auto  group-hover:grayscale-0 grayscale-70 group-hover:scale-105 transition-all "
                    /> : <p>No img FOund</p>
                }
            </div>

            <div className='flex items-center justify-between px-2 mt-3 '>
                <div className='flex gap-y-3 flex-col'>
                    <p className='text-xl'>{data.title}</p>
                    <p className='px-2 w-fit rounded-md py-0.5 bg-[#22333b] text-white'>❤️{data.favorites}</p>
                </div>

                <div className='flex items-center justify-center flex-col gap-y-3'>
                    <p className='px-2 w-fit rounded-md py-0.5 bg-[#306983] text-white'>⭐{data.score}</p>
                    <p className='px-2 w-fit rounded-md py-0.5 bg-[#19790c] text-white'>📄{data.chapters ? data.chapters : 0}</p>
                </div>
            </div>
            <div className='flex items-center flex-wrap justify-center my-4 gap-2'>
                {
                    genData.map((item) => <p className='text-nowrap p-2 border rounded-md' key={item.mal_id}>{genreEmoji[item.name] ?? "🎬"} {item.name}</p>)
                }
            </div>
            <div>
                <Link className='flex items-center justify-center' href={`/mangas/${data.title}-${data.mal_id}`}>
                    <Button className='cursor-pointer'>details</Button>
                </Link>
            </div>
        </div>
    );
};

export default MangaCard;