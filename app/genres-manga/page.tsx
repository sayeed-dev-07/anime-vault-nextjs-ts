

import FetchGenres from '@/components/FetchGenres';



const page = () => {
    return (
        <div  className='mt-5'>
            <p className='sm:text-6xl text-3xl mb-3'>Manga Genres</p>
            <div>
                <FetchGenres name='manga'/>
            </div>
        </div>
    );
};

export default page;