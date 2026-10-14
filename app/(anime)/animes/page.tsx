

import InfinityScroll from '@/components/InfinityScroll';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Browse Anime',
    description: 'Browse a wide collection of anime and find your next series to watch.',
};


const page = () => {
    return (
        <div className=' max-w-[1600px] mx-auto'>
            <p className='sm:text-6xl text-3xl mb-3'>Animes</p>
            <div>
                <InfinityScroll randomIdnt='anime'/>
            </div>
        </div>
    );
};

export default page;
