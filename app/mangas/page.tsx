

import InfinityScroll from '@/components/InfinityScroll';


const page = () => {
    return (
        <div className='mt-5'>
            <p className='text-6xl mb-3'>Mangas</p>
            <div>
                <InfinityScroll name='MangaData'/>
            </div>
        </div>
    );
};

export default page;