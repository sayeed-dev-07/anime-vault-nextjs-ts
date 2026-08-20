import Image from 'next/image';
import Link from 'next/link';
import { Heart } from 'lucide-react';
import FormatSegment from './Format';
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

export type linkName = 'animes' | 'mangas';


const RecommendationCard = ({ data, name = 'animes' }: { data: Recommendation, name?: linkName }) => {
    return (
        <div className='smallCard opacity-0 bg-card border border-border rounded-2xl overflow-hidden flex flex-col group hover:shadow-md transition-shadow duration-300 h-full'>

            <div className='relative w-full aspect-[3/4] bg-muted overflow-hidden'>
                <Image
                    fill
                    className='object-cover transition-transform duration-500 ease-out group-hover:scale-110'
                    src={data.entry.images.jpg.large_image_url}
                    loading="lazy"
                    sizes='(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw'
                    alt={data.entry.title}
                />
            </div>

            <div className='p-3 sm:p-4 flex flex-col gap-3 flex-grow'>
                <h4 className='font-bold text-sm sm:text-base leading-tight line-clamp-2 text-foreground' title={data.entry.title}>
                    {data.entry.title}
                </h4>

                <span className='flex items-center gap-1.5 text-xs font-medium text-muted-foreground bg-secondary px-2 py-1 rounded-md border border-border/50 w-fit'>
                    <Heart className="w-3.5 h-3.5 text-[crimson]" />
                    {data.votes.toLocaleString()} Votes
                </span>

                {/* Pushes the button to the bottom if title is only 1 line */}
                <div className='mt-auto pt-2'>
                    <Link href={`/${name}/${FormatSegment(data.entry.title)}-${data.entry.mal_id}`} className="w-full">
                        <ButtonSpin />
                    </Link>
                </div>
            </div>

        </div>
    );
};

export default RecommendationCard;