
import SearchFetch from '@/components/SearchFetch';


const page = async ({ searchParams }: { searchParams: Promise<{ name: string }> }) => {
    const { name } = await searchParams;
    return (
        <div className='mt-5'>
            <p className='sm:text-6xl text-3xl mb-3'>Search Result for &quot;{name}&quot;</p>
            <div className='mt-6 w-full '>
                <SearchFetch searchName={name} />
            </div>
            <div className='mt-6 w-full  '>

                <SearchFetch searchName={name} name='search-manga' />

            </div>
        </div>
    );
};

export default page;