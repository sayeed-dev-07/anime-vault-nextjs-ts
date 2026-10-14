

import InfinityScroll from '@/components/InfinityScroll';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Browse Manga',
    description: 'Browse a wide collection of manga and find your next story to read.',
};


const page = () => {
    return (
        <div className=' max-w-[1600px] mx-auto  '>
            <p className='sm:text-6xl text-3xl mb-3'>Mangas</p>
            <div>
                <InfinityScroll randomIdnt='manga' name='mangaData' />
            </div>
        </div>
    );
};

export default page;
