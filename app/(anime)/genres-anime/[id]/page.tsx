
import FormatSegment from '@/components/Format';
import InfinityScroll from '@/components/InfinityScroll';


const page = async ({params}: {params: Promise<{ id: string }>
}) => {
    const {id} = await params;
    const [name, ...genId] = id.split('-')
    return (
        <div className='mt-5'>
            <p className='sm:text-6xl text-3xl mb-3'>{FormatSegment(name)}</p>
            <div>
                <InfinityScroll randomIdnt='gen-anime' gener={true} name='animeData' genID={Number(genId)}/>
            </div>
        </div>
    );
};

export default page;