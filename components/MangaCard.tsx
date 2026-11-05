'use client'

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Star, Heart, Book, ArrowUpRight } from 'lucide-react';

import { Manga } from './FetchAnime';
import FormatSegment from './Format';
import FavButton from './FavButton';

const MangaCard = ({ data }: { data: Manga }) => {
  return (
    <Link
      href={`/mangas/${FormatSegment(data.title)}-${data.mal_id}`}
      className='group my-3 relative flex flex-col w-full'
    >
      <div
        className='absolute top-2 right-2 z-20 transition-opacity duration-300 opacity-100 md:opacity-0 md:group-hover:opacity-100'
        onClick={(e) => e.preventDefault()}
      >
        <FavButton type='Manga' data={data} />
      </div>

      <div className='relative w-full aspect-[3/4] max-h-[320px] overflow-hidden border-[3px] border-foreground bg-muted mb-3 shadow-[4px_4px_0_var(--foreground)] transition-transform duration-300 md:group-hover:-translate-y-1'>
        {data.images?.jpg?.large_image_url ? (
          <Image
            src={data.images.jpg.large_image_url}
            sizes='(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw'
            alt={data.title || 'Manga Image'}
            fill
            className='object-cover transition-transform duration-700 ease-out md:group-hover:scale-105'
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-muted-foreground text-xs">
            No image
          </div>
        )}

        <div className="absolute inset-0 bg-black/0 transition-colors duration-300 md:group-hover:bg-black/10" />
      </div>

      <div className='flex flex-col px-1'>

        <div className="flex justify-between items-start gap-2 mb-1">
          <h3 className='text-sm sm:text-base font-extrabold leading-snug line-clamp-2 text-foreground transition-colors md:group-hover:text-[#e6392d]'>
            {data.title}
          </h3>
          <ArrowUpRight className="w-4 h-4 text-muted-foreground flex-shrink-0 transition-all duration-300 opacity-100 translate-x-0 translate-y-0 md:opacity-0 md:-translate-x-2 md:translate-y-2 md:group-hover:opacity-100 md:group-hover:translate-x-0 md:group-hover:translate-y-0" />
        </div>

        <div className='flex items-center gap-3 mt-1'>
          <span className='flex items-center gap-1 text-[11px] sm:text-xs font-medium text-muted-foreground'>
            <Star className="w-3 h-3 text-foreground/50" />
            {data.score ?? 'N/A'}
          </span>
          <span className='flex items-center gap-1 text-[11px] sm:text-xs font-medium text-muted-foreground'>
            <Heart className="w-3 h-3 text-foreground/50" />
            {data.favorites ?? 0}
          </span>
          <span className='flex items-center gap-1 text-[11px] sm:text-xs font-medium text-muted-foreground'>
            <Book className="w-3 h-3 text-foreground/50" />
            {data.chapters ?? 0}
          </span>
        </div>

      </div>
    </Link>
  );
};

export default MangaCard;
