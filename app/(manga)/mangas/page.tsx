

import InfinityScroll from '@/components/InfinityScroll';


const page = () => {
    return (
        <div className='mt-5'>
            <p className='sm:text-6xl text-3xl mb-3'>Mangas</p>
            <div>
                <InfinityScroll randomIdnt='manga' name='mangaData'/>
            </div>
        </div>
    );
};

export default page;