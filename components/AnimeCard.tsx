
import Link from 'next/link';
import { Anime } from './FetchAnime';
import Image from 'next/image';
import { Button } from './ui/button';


const AnimeCard = ({ data }: { data: Anime }) => {

    return (
        <div className='bg-chatgpt-card border border-[#b3b3b3] rounded-xl mb-3 p-2'>
            <div className="relative w-full aspect-4/4 sm:aspect-3/5">
                {
                    data.images.jpg.large_image_url ? <Image
                        src={data.images.jpg.large_image_url}
                        sizes='100vw aspect-4/4'
                        alt="img"
                        fill loading="eager" 
                        className="object-cover rounded-t-xl"
                    /> : <p>No img FOund</p>
                }
            </div>

            <div className='flex items-center justify-between px-2 gap-y-2 mt-3 '>
                <div className='flex gap-x-2 gap-y-3 flex-col'>
                    <p className='text-xl'>{data.title}</p>
                    <p className='px-2 w-fit rounded-md py-0.5 bg-[#22333b] text-white'>❤️{data.favorites}</p>
                </div>

                <div className='flex items-center justify-center flex-col gap-y-3'>
                    <p className='px-2 w-fit rounded-md py-0.5 bg-[#306983] text-white'>⭐{data.score}</p>
                    <p className='px-2 w-fit rounded-md py-0.5 bg-[#19790c] text-white'>📺{data.type}</p>
                </div>
            </div>
            <div>

                <div className='flex items-center mt-3 justify-center'>
                    <Button className='cursor-pointer mb-3'>
                    <Link className='' href={`/animes/${data.mal_id}`}>Details</Link>
                </Button>
                </div>

            </div>
        </div>
    );
};

export default AnimeCard;