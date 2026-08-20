

import InfinityScroll from '@/components/InfinityScroll';


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