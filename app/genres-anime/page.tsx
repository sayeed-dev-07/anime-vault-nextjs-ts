

import FetchGenres from '@/components/FetchGenres';


const page = () => {
    return (
        <div className='mt-5'>
            <p className='sm:text-6xl text-3xl mb-3'>Anime Genres</p>
            <div>
                <FetchGenres name='anime'/>
            </div>
        </div>
    );
};

export default page;