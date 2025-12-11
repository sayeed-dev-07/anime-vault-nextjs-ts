import CardDetailsMnga from '@/components/CardDetailsMnga';



const page = async({ params }: { params: Promise<{ id: string }>}) => {
    const {id} = await params;
    const [name, ...genId] = id.split('-')
    const res = await fetch(`https://api.jikan.moe/v4/manga/${genId}`)
    const resData = await res.json();
    const mangaData = resData.data;
    return (
        <div>
            <CardDetailsMnga manga={mangaData}/>
        </div>
    );
};

export default page;