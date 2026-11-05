

import FetchGenres from '@/components/FetchGenres';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Manga Genres',
    description: 'Browse manga by genre, from action and adventure to romance, fantasy, and more.',
};



const page = () => {
    return (
        <div className=' max-w-[1600px] mx-auto  '>
            <p className='comic-heading sm:text-5xl text-3xl mb-7 text-[#e6392d] [text-shadow:3px_3px_0_var(--foreground)]'>Manga Genres</p>
            <div>
                <FetchGenres name='manga' />
            </div>
        </div>
    );
};

export default page;
