import Image from 'next/image';
import { Button } from './ui/button';

import FormatSegment from './Format';
import Link from 'next/link';


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
        <div className='p-4 max-w-[400px] border rounded-xl shadow-md ease-linear will-change-auto duration-200 group   transition-all hover:shadow-xl'>
            <div className='w-full h-[300px] relative mb-6 overflow-hidden'>
                <Image fill className='object-cover h-auto w-auto duration-200 will-change-auto  group-hover:grayscale-0 grayscale-70 group-hover:scale-105 transition-all  rounded-xl' src={data.entry.images.jpg.large_image_url} loading="eager" sizes='100' alt={`${data.entry.title}`} />
            </div>
            <div className='flex flex-col items-start justify-center gap-y-3'>
                <p className='text-2xl font-semibold'>
                    {data.entry.title}
                </p>
                <p className='font-semibold text-xl'>
                    <span className='font-semibold text-xl'>❤️ Votes: </span>{data.votes}
                </p>
                <div className='flex w-full items-center mt-3 justify-center'>
                    <Button className='cursor-pointer mb-3'>
                        <Link className='' href={`/${name}/${FormatSegment(data.entry.title)}-${data.entry.mal_id}`}>Details</Link>
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default RecommendationCard;