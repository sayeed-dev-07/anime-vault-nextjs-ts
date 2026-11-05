

import InfinityScroll from '@/components/InfinityScroll';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Browse Manga',
    description: 'Browse a wide collection of manga and find your next story to read.',
};


const page = () => {
    return (
        <div className=' max-w-[1600px] mx-auto  '>
            <p className='comic-heading sm:text-5xl text-3xl mb-7 text-[#e6392d] [text-shadow:3px_3px_0_var(--foreground)]'>Mangas</p>
            <div>
                <InfinityScroll randomIdnt='manga' name='mangaData' />
            </div>
        </div>
    );
};

export default page;
