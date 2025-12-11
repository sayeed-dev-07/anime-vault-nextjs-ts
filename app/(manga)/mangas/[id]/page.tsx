import CardDetailsMnga from '@/components/CardDetailsMnga';
import Error from '@/components/Error';



const page = async({ params }: { params: Promise<{ id: string }>}) => {
    const {id} = await params;
    const mangaId = id.split('-').pop();
    
    const res = await fetch(`https://api.jikan.moe/v4/manga/${mangaId}`)

    

    if (!res.ok) {
        return <div className='w-full min-h-[40vh] flex items-center justify-center'>
            <Error/>
        </div>
    }
    
    const resData = await res.json();
    
    
    const mangaData = resData.data;
    
    return (
        <div>
            <CardDetailsMnga manga={mangaData}/>
        </div>
    );
};

export default page;