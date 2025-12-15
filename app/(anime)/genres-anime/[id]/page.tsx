
import FormatSegment from '@/components/Format';
import InfinityScroll from '@/components/InfinityScroll';


const page = async ({params}: {params: Promise<{ id: string }>
}) => {
    const {id} = await params;
    const allParts = id.split('-')
    const genId = allParts.pop()
    return (
        <div className='mt-5 max-w-[1600px] mx-auto py-10 px-4'>
            <p className='sm:text-6xl text-3xl mb-3'>{FormatSegment(allParts.join(' '))}</p>
            <div>
                <InfinityScroll randomIdnt='gen-anime' gener={true} name='animeData' genID={Number(genId)}/>
            </div>
        </div>
    );
};

export default page;