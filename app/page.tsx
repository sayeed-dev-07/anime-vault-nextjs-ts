
import FetchAnime from '@/components/FetchAnime';

import { Button } from '@/components/ui/button';
import Link from 'next/link';
import React from 'react';

const page = () => {
  return (
    <div className=''>
      
      <div className='text-xl border p-3 sm:p-6 rounded-md sm:mt-[5%] mt-[10%]  text-center bg-card-bg'>
        <p className='text-2xl '><span className='text-5xl font-semibold block mb-3'>
          Welcome to AniSearch
          </span>
            Your ultimate destination for discovering detailed information about your favorite anime and manga. Explore by title, genre, release year, characters, or studios and dive into ratings, summaries, reviews, trailers, episodes, and more. Start your anime journey with us today!</p>
        <div className='mt-5 flex items-center justify-center gap-x-5'>
          <Link href='/animes'>
            <Button className='cursor-pointer text-2xl'>Anime</Button>
          </Link>
          <Link href='/mangas'>
            <Button variant={'secondary'} className='cursor-pointer text-2xl'>Manga</Button>
          </Link>

        </div>
      </div>
      <div className='mt-[5%]'>
        <div>
        <p className='text-3xl sm:text-5xl mb-[2%]'>Random Animes</p>
        <div className=''>
          <FetchAnime limit={10} top={false} type={'anime'}/>
          <div className='mt-12 flex items-center justify-center'>
            <Link href='/animes'>
            <Button variant={'outline'} size={'lg'} className='cursor-pointer text-2xl'>Browse Animes</Button>
          </Link>
          </div>
        </div>
      </div>
      <div className='mt-[5%]'>
        <p className='text-3xl sm:text-5xl mb-[2%]'>Random Mangas</p>
        <div>
          <FetchAnime limit={10} top={false} type={'manga'}/>
        </div>
        <div className='mt-12 flex items-center justify-center'>
            <Link href='/mangas'>
            <Button variant={'outline'} size={'lg'} className='cursor-pointer text-2xl'>Browse Mangas</Button>
          </Link>
          </div>
      </div>
      </div>
    </div>
  );
};

export default page;