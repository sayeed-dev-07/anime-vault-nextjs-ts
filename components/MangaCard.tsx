import React from 'react';
import { Manga } from './FetchAnime';
import Link from 'next/link';

import Image from 'next/image';
import { genreEmoji } from './AnimeCard';
import ButtonSpin from './Button';
import FavButton from './FavButton';
import { motion } from 'motion/react';


const parent = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                delay: 0.4,
                staggerChildren: 0.2,
                delayChildren: 0.2
            }
        }
    };
    const child = {
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0 },
    };

const MangaCard = ({ data }: { data: Manga }) => {
    const genData = [...data.genres, ...data.themes]
    return (
        <motion.div initial={{opacity:0, y:20}} whileInView={{opacity:1, y:0}} transition={{duration:0.2, type:'spring', delay:0.1}} className='bg-chatgpt-card border border-[#b3b3b3] mb-3 rounded-xl p-2  ease-linear will-change-auto duration-200 group shadow-md hover:shadow-xl  transition-all relative'>
            <div className='absolute top-3 right-4 z-5'> <FavButton type='Manga' data={data}/> </div>
            <motion.div initial={{y:-4, opacity:0}} animate={{y:0, opacity: 1}} transition={{duration: 0.3, type:'spring', delay:0.1}} className="relative w-full aspect-4/4 overflow-hidden sm:aspect-3/5">
                {
                    data.images.jpg.large_image_url ? <Image
                        src={data.images.jpg.large_image_url}
                        loading="eager"
                        sizes='100vw 100vh'
                        alt="img"
                        fill
                        className="object-cover rounded-t-xl duration-200 will-change-auto  group-hover:grayscale-0 grayscale-70 group-hover:scale-105 transition-all "
                    /> : <p>No img FOund</p>
                }
            </motion.div>

            <div className='flex items-center justify-between px-2 mt-3 '>
                <motion.div initial={{x:-12, opacity:0}} whileInView={{x:0, opacity: 1}} transition={{duration: 0.3, type:'spring', delay:0.2}} className='flex gap-y-3 flex-col'>
                    <p className='text-xl'>{data.title}</p>
                    <p className='px-2 w-fit rounded-md py-0.5 bg-[#22333b] text-white'>❤️{data.favorites}</p>
                </motion.div>

                <motion.div initial={{x:12, opacity:0}} whileInView={{x:0, opacity: 1}} transition={{duration: 0.3, type:'spring', delay:0.4}} className='flex items-center justify-center flex-col gap-y-3'>
                    <p className='px-2 w-fit rounded-md py-0.5 bg-[#306983] text-white'>⭐{data.score}</p>
                    <p className='px-2 w-fit rounded-md py-0.5 bg-[#19790c] text-white'>📄{data.chapters ? data.chapters : 0}</p>
                </motion.div>
            </div>
            <motion.div variants={parent} initial="hidden" whileInView="show" className='flex items-center flex-wrap justify-center my-4 gap-2'>
                {
                    genData.map((item) => <motion.p variants={child} className='text-nowrap p-2 border rounded-md' key={item.mal_id}>{genreEmoji[item.name] ?? "🎬"} {item.name}</motion.p>)
                }
            </motion.div>
            <motion.div initial={{x:12, opacity:0}} whileInView={{x:0, opacity: 1}} transition={{duration: 0.5, type:'spring', delay:1}} className='flex items-center mt-3 justify-center'>
                <Link className='flex items-center justify-center' href={`/mangas/${data.title}-${data.mal_id}`}>
                    <ButtonSpin/>
                </Link>
            </motion.div>
        </motion.div>
    );
};

export default MangaCard;