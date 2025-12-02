import { AnimeProp, AnimePropContainer } from '@/app/page';
import Image from 'next/image';
import React from 'react';

const AnimeCard = ({ anime }: AnimePropContainer) => {
    const img = `https://shikimori.one${anime.image.original}`
    return (
        <div className='p-2 bg-[#708d81] flex  flex-col gap-y-3'>
            <div className="relative w-full h-95">
                <Image className='rounded-lg' src={img} fill alt={anime.name} />
            </div>
            <div className='flex items-center  justify-between '>
                <div>
                    <p className='text-xl font-semibold text-[#001219]'>{anime.name}</p>
                </div>
                <div className='flex items-center justify-end gap-3 flex-wrap'>
                    <p className='px-2 rounded-sm text-white py-0.5 bg-[#bb4430]'>{anime.kind}</p>
                    <p className='px-2 rounded-sm text-[#ffffff] py-0.5 bg-[#231f20]'>{anime.score}</p>
                </div>

            </div>
            <div className='flex items-center justify-center'>
                <button className=' px-3 py-1.5 cursor-pointer rounded-sm text-white bg-[#1c2321]'>Details</button>
            </div>
        </div>
    );
};

export default AnimeCard;