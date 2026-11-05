

import InfinityScroll from '@/components/InfinityScroll';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Top Anime',
    description: 'Explore the top-ranked anime and discover highly rated series to watch next.',
};


const page = () => {
    return (
        <div className=' max-w-[1600px] mx-auto'>
            <p className='comic-heading sm:text-5xl text-3xl mb-7 text-[#e6392d] [text-shadow:3px_3px_0_var(--foreground)]'>Top Animes</p>
            <div>
                <InfinityScroll randomIdnt='animeTop' top={true} />
            </div>
        </div>
    );
};

export default page;
