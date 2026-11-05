

import InfinityScroll from '@/components/InfinityScroll';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Browse Anime',
    description: 'Browse a wide collection of anime and find your next series to watch.',
};


const page = () => {
    return (
        <div className=' max-w-[1600px] mx-auto'>
            <p className='comic-heading sm:text-5xl text-3xl mb-7 text-[#e6392d] [text-shadow:3px_3px_0_var(--foreground)]'>Animes</p>
            <div>
                <InfinityScroll randomIdnt='anime'/>
            </div>
        </div>
    );
};

export default page;
