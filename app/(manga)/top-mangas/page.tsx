

import InfinityScroll from '@/components/InfinityScroll';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Top Manga',
    description: 'Explore the top-ranked manga and discover highly rated stories to read next.',
};


const page = () => {
    return (
        <div className=' max-w-[1600px] mx-auto '>
            <p className='text-6xl mb-3'>Top Mangas</p>
            <div>
                <InfinityScroll name='mangaData' randomIdnt='mangaTop' top={true} />
            </div>
        </div>
    );
};

export default page;
