

import InfinityScroll from '@/components/InfinityScroll';


const page = () => {
    return (
        <div className='mt-5 max-w-[1600px] mx-auto py-10 px-4'>
            <p className='text-6xl mb-3'>Top Mangas</p>
            <div>
                <InfinityScroll name='mangaData' randomIdnt='mangaTop' top={true} />
            </div>
        </div>
    );
};

export default page;