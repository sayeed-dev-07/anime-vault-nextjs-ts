

import InfinityScroll from '@/components/InfinityScroll';


const page = () => {
    return (
        <div className='mt-5 max-w-[1600px] mx-auto py-10 px-4'>
            <p className='sm:text-6xl text-3xl mb-3'>Animes</p>
            <div>
                <InfinityScroll randomIdnt='anime'/>
            </div>
        </div>
    );
};

export default page;