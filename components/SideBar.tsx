import { Heart, Home, MedalIcon, Sparkles,  Tv } from 'lucide-react';
import Link from 'next/link';
import React from 'react';
import { BiCategory } from 'react-icons/bi';

const SideBar = () => {
    return (
        <div className='w-full mx-1 flex flex-col items-center text-primary font-semibold  text-lg mt-4'>
            <div className='flex flex-col items-start gap-y-3'>
                <Link href='/' className='flex items-center justify-center gap-x-2'>
                <Home size={22}/> <p>Home</p>
            </Link>
            <Link href='/faviourite' className='flex items-center justify-center gap-x-2'>
                <Heart size={22}/> <p>Faviourite</p>
            </Link>
            <p className='text-[17px] mt-3 text-[crimson]'>Anime</p>
            <Link href='/animes' className='flex justify-center items-center gap-x-2'>
                   <Tv size={22}/> <p>All Animes</p>
            </Link>
            <Link href='/top-animes' className='flex justify-center items-center gap-x-2'>
                   <MedalIcon className='mt-1' size={22}/> <p>Top Animes</p>
            </Link>
            <Link href='/recommendations-anime' className='flex justify-start items-center gap-x-2 flex-wrap'>
                   <Sparkles className='mt-1' size={22}/> <p className='wrap-break-word'>Recommendations</p>
            </Link>
            <Link href='/genres-anime' className='flex justify-start items-center gap-x-2 flex-wrap'>
                   <BiCategory className='mt-1' size={22}/> <p className='wrap-break-word'>Genres</p>
            </Link>
            <p className='text-[17px] mt-3 text-[crimson]'>Manga</p>
            <Link href='/mangas' className='flex justify-center items-center gap-x-2'>
                   <Tv size={22}/> <p>All Mangas</p>
            </Link>
            <Link href='/top-mangas' className='flex justify-center items-center gap-x-2'>
                   <MedalIcon className='mt-1' size={22}/> <p>Top Mangas</p>
            </Link>
            <Link href='/recommendations-manga' className='flex justify-start items-center gap-x-2 flex-wrap'>
                   <Sparkles className='mt-1' size={22}/> <p className='wrap-break-word'>Recommendations</p>
            </Link>
            <Link href='/genres-manga' className='flex justify-start items-center gap-x-2 flex-wrap'>
                   <BiCategory className='mt-1' size={22}/> <p className='wrap-break-word'>Genres</p>
            </Link>
            </div>
            
            
        </div>
    );
};

export default SideBar;