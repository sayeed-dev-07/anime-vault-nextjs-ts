'use client';
import Image from 'next/image';
import { motion } from 'motion/react';

import FormatSegment from './Format';
import Link from 'next/link';
import ButtonSpin from './Button';


export interface Recommendation {
    entry: RecommendationEntry;
    votes: number;
}

export interface RecommendationEntry {
    mal_id: number;
    url: string;
    images: RecommendationImages;
    title: string;
}

export interface RecommendationImages {
    jpg: RecommendationImageSet;
    webp: RecommendationImageSet;
}

export interface RecommendationImageSet {
    image_url: string;
    small_image_url: string;
    large_image_url: string;
}

export type linkName = 'animes' | 'mangas'

const RecommendationCard = ({ data , name = 'animes'}: { data: Recommendation , name?: linkName}) => {
    return (
        <motion.div initial={{opacity:0, y:30}} whileInView={{opacity:1, y:0}} transition={{duration:0.3, type:'spring', damping:20, stiffness:200, delay:0.2}} className='p-4 max-w-[400px] border rounded-xl shadow-md ease-linear will-change-auto duration-200 group   transition-all hover:shadow-xl'>
            <div className='w-full h-[300px] relative mb-6 overflow-hidden'>
                <Image fill className='object-cover h-auto w-auto duration-200 will-change-auto  group-hover:grayscale-0 grayscale-70 group-hover:scale-105 transition-all  rounded-xl' src={data.entry.images.jpg.large_image_url} loading="eager" sizes='100' alt={`${data.entry.title}`} />
            </div>
            <div className='flex flex-col items-start justify-center gap-y-3'>
                <p className='text-lg font-semibold'>
                    📝 Name: <span className='font-normal'>{data.entry.title}</span>
                </p>
                <p className=''>
                    <span className='text-lg font-medium'>❤️ Votes: </span>{data.votes}
                </p>
                <div className='flex w-full items-center mt-3 justify-center'>
                    
                        <Link className='' href={`/${name}/${FormatSegment(data.entry.title)}-${data.entry.mal_id}`}>
                        <ButtonSpin/>
                        </Link>
                </div>
            </div>
        </motion.div>
    );
};

export default RecommendationCard;