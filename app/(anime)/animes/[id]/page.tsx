
import CardDetails from '@/components/CardDetails';


const page = async({ params }: { params: Promise<{ id: string }>}) => {
    const {id} = await params;
    const mangaId = id.split('-').pop();
    const res = await fetch(`https://api.jikan.moe/v4/anime/${mangaId}`)
    const resData = await res.json();
    const animeData = resData.data;
    return (
        <div>
            {
                <CardDetails anime={animeData}/>
            }
        </div>
    );
};

export default page;