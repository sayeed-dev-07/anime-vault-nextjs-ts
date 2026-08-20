

import InfinityScroll from '@/components/InfinityScroll';


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