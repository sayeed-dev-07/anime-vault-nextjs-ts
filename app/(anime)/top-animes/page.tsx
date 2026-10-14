

import InfinityScroll from '@/components/InfinityScroll';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Top Anime',
    description: 'Explore the top-ranked anime and discover highly rated series to watch next.',
};


const page = () => {
    return (
        <div className=' max-w-[1600px] mx-auto'>
            <p className='sm:text-6xl text-3xl mb-3'>Top Animes</p>
            <div>
                <InfinityScroll randomIdnt='animeTop' top={true} />
            </div>
        </div>
    );
};

export default page;
