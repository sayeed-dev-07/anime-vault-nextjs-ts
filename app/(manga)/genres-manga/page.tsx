

import FetchGenres from '@/components/FetchGenres';



const page = () => {
    return (
        <div className=' max-w-[1600px] mx-auto  px-4'>
            <p className='sm:text-6xl text-3xl mb-3'>Manga Genres</p>
            <div>
                <FetchGenres name='manga' />
            </div>
        </div>
    );
};

export default page;