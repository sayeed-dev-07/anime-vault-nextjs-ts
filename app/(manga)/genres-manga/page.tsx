

import FetchGenres from '@/components/FetchGenres';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Manga Genres',
    description: 'Browse manga by genre, from action and adventure to romance, fantasy, and more.',
};



const page = () => {
    return (
        <div className=' max-w-[1600px] mx-auto  '>
            <p className='sm:text-6xl text-3xl mb-3'>Manga Genres</p>
            <div>
                <FetchGenres name='manga' />
            </div>
        </div>
    );
};

export default page;
