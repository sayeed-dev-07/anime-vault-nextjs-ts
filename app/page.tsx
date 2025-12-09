import AnimeCard from '@/components/AnimeCard';
import FetchAnime from '@/components/FetchAnime';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import React from 'react';

const page = () => {
  return (
    <div className=''>
      <div className='text-xl border p-3 sm:p-6 rounded-md sm:mt-[5%] mt-[10%] text-start sm:text-center bg-card-bg'>
        <p className=''>Welcome to <span className=' font-semibold'>AniSearch</span>, your ultimate destination for discovering detailed information about your favorite anime and manga. Explore by title, genre, release year, characters, or studios and dive into ratings, summaries, reviews, trailers, episodes, and more. Start your anime journey with us today!</p>
        <div className='mt-5 flex items-center justify-center gap-x-5'>
          <Link href='/animes'>
            <Button className='cursor-pointer'>Anime</Button>
          </Link>
          <Link href='/mangas'>
            <Button className='cursor-pointer'>Manga</Button>
          </Link>

        </div>
      </div>
      <div className='mt-[5%]'>
        <div>
        <p className='text-5xl mb-[2%]'>Random Animes</p>
        <div className=''>
          <FetchAnime limit={8} top={false} type={'anime'}/>
        </div>
      </div>
      <div className='mt-[5%]'>
        <p className='text-5xl mb-[2%]'>Random Mangas</p>
      </div>
      </div>
    </div>
  );
};

export default page;