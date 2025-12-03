import {  useAnimeContext } from '@/app/context';
import {  AnimePropContainer } from '@/app/page';
import { getFullLink } from '@/app/providers';
import Image from 'next/image';
import Link from 'next/link';
import { BiHeart } from 'react-icons/bi';
import { FaHeart } from 'react-icons/fa';

const AnimeCard = ({ anime }: AnimePropContainer) => {
    
    const {faviourite, setFaviourite} = useAnimeContext()
    function handleCLick(){
        if (faviourite.includes(anime)) {
            const newFav = faviourite.filter((anim)=> anim.id !== anime.id)
            setFaviourite([...newFav])
        }else{
            setFaviourite(prev => [...prev, anime])
        }
    }
   
    return (
        <div className='p-2 bg-[#708d81] flex  flex-col gap-y-3 max-w-[500px]'>
            <div className="relative w-full h-95">
                <Image className='rounded-lg' src={getFullLink(anime.image.original)} fill alt={anime.name} />
            </div>
            <div className='flex items-center  justify-between '>
                <div>
                    <p className='text-xl font-semibold text-[#001219]'>{anime.name}</p>
                </div>
                <div className='flex items-center justify-end gap-3 flex-wrap'>
                    <p className='px-2 rounded-sm text-white py-0.5 bg-[#bb4430]'>{anime.kind}</p>
                    <p className='px-2 rounded-sm text-[#ffffff] py-0.5 bg-[#231f20]'>{anime.score}</p>
                </div>

            </div>
            <div className='flex items-center justify-between'>
                <Link href={`/animes/${anime.id}`} className=' px-3 py-1.5 cursor-pointer rounded-sm text-white bg-[#1c2321]'>Details</Link>
                <div onClick={ handleCLick}>
                    {
                        faviourite.includes(anime) ? <FaHeart size={32} className='cursor-pointer' fill='crimson'/>  :<BiHeart  className='cursor-pointer hover:fill-[crimson]' size={32}/>
                    }
                </div>
            </div>
        </div>
    );
};

export default AnimeCard;