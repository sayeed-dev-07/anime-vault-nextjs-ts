
import Link from 'next/link';
import { Anime } from './FetchAnime';
import Image from 'next/image';
import { Button } from './ui/button';


const AnimeCard = ({ data }: { data: Anime }) => {

    return (
        <div className='bg-chatgpt-card border border-[#b3b3b3] rounded-xl p-2'>
            <div className="relative w-full aspect-4/4">
                {
                    data.images.jpg.large_image_url ? <Image
                    src={data.images.jpg.large_image_url}
                    alt="img"
                    fill
                    className="object-cover rounded-t-xl"
                /> : <p>No img FOund</p>
                }
            </div>

            <div className='flex items-center justify-between px-2 mt-3 '>
                <div className='flex gap-y-3 flex-col'>
                    <p className='text-xl'>{data.title}</p>
                    <p className='px-2 w-fit rounded-md py-0.5 bg-[#22333b] text-white'>{data.rank}</p>
                </div>

                <div className='flex items-center justify-center flex-col gap-y-3'>
                    <p className='px-2 w-fit rounded-md py-0.5 bg-[#306983] text-white'>{data.score}</p>
                    <p className='px-2 w-fit rounded-md py-0.5 bg-[#19790c] text-white'>{data.type}</p>
                </div>
            </div>
            <div>
                <Link className='flex items-center justify-center' href={`/animes/${data.mal_id}`}>
                    <Button className='cursor-pointer'>details</Button>
                </Link>
            </div>
        </div>
    );
};

export default AnimeCard;