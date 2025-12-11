

import InfinityScroll from '@/components/InfinityScroll';


const page = () => {
    return (
        <div className='mt-5'>
            <p className='sm:text-6xl text-3xl mb-3'>Top Animes</p>
            <div>
                <InfinityScroll randomIdnt='animeTop' top={true}/>
            </div>
        </div>
    );
};

export default page;