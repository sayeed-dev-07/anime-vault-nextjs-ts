

import FetchGenres from '@/components/FetchGenres';


const page = () => {
    return (
        <div className=' max-w-[1600px] mx-auto '>
            <p className='sm:text-6xl text-3xl mb-3'>Anime Genres</p>
            <div>
                <FetchGenres name='anime' />
            </div>
        </div>
    );
};

export default page;