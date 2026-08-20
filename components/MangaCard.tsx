'use client'

import React, { useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Star, Heart, Book } from 'lucide-react'; // Updated to use Book for chapters

import { Manga } from './FetchAnime';
import ButtonSpin from './Button';
import FavButton from './FavButton';
import { genreEmoji } from '@/public/data/EmojiData';

gsap.registerPlugin(useGSAP, ScrollTrigger);

const MangaCard = ({ data }: { data: Manga }) => {
  const cardRef = useRef<HTMLDivElement | null>(null);

  useGSAP(
    () => {
      const card = cardRef.current;
      if (!card) return;

      const imageWrapper = card.querySelector('[data-image-wrapper]');
      const image = card.querySelector('[data-card-image]');
      
      // Grab all text, stats, and tags to stagger them together
      const contentElements = gsap.utils.toArray<HTMLElement>('[data-reveal-element]', card);

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: card,
          start: 'top 92%', // Triggers slightly before scrolling fully into view
          once: true,
        },
      });

      // 1. Initial Card Fade & Slight Slide
      tl.fromTo(
        card,
        { autoAlpha: 0, y: 30 },
        { autoAlpha: 1, y: 0, duration: 0.6, ease: 'power3.out' }
      );

      // 2. Modern Clip-Path Image Reveal
      if (imageWrapper && image) {
        tl.fromTo(
          imageWrapper,
          { clipPath: 'inset(100% 0% 0% 0% round 12px)' },
          { clipPath: 'inset(0% 0% 0% 0% round 12px)', duration: 0.8, ease: 'power4.inOut' },
          "-=0.4"
        ).fromTo(
          image,
          { scale: 1.25 },
          { scale: 1, duration: 0.8, ease: 'power3.out' },
          "-=0.8" 
        );
      }

      // 3. Springy Stagger for all content
      if (contentElements.length) {
        tl.fromTo(
          contentElements,
          { autoAlpha: 0, y: 15 },
          { autoAlpha: 1, y: 0, duration: 0.5, stagger: 0.06, ease: 'back.out(1.4)' },
          "-=0.5" 
        );
      }
    },
    { scope: cardRef }
  );

  // Added safety fallback just in case the API returns null
  const genData = [...(data.genres || []), ...(data.themes || [])];

  return (
    <div
      ref={cardRef}
      className='bg-card text-card-foreground overflow-hidden border border-border rounded-2xl mb-4 p-3 shadow-sm hover:shadow-md transition-shadow duration-300 relative flex flex-col group invisible'
    >
      {/* Favorite Button */}
      <div className='absolute top-5 right-5 z-20'>
        <FavButton type='Manga' data={data} />
      </div>

      {/* Image Wrapper target for the Clip-Path animation */}
      <div data-image-wrapper className='relative w-full aspect-[3/4] max-h-[280px] sm:max-h-[320px] md:max-h-[380px] overflow-hidden rounded-xl bg-muted'>
        
        {data.images?.jpg?.large_image_url ? (
          <Image
            src={data.images.jpg.large_image_url}
            sizes='(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw'
            data-card-image
            alt={data.title || 'Manga Image'}
            fill
            loading='eager'
            className='object-cover group-hover:scale-[1.10] transition-transform duration-700 ease-out'
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-muted-foreground text-sm font-medium">
            No image available
          </div>
        )}
        
        {/* Subtle gradient overlay to ensure the FavButton is always visible */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-transparent z-10 pointer-events-none" />
      </div>

      {/* Card Content */}
      <div className='flex flex-col px-1 mt-4'>
        
        {/* Title */}
        <h3 data-reveal-element className='text-lg font-bold leading-tight line-clamp-2 mb-3'>
          {data.title}
        </h3>

        {/* Stats Row */}
        <div className='flex flex-wrap items-center gap-2 mb-4'>
          <span data-reveal-element className='flex items-center gap-1.5 px-2 py-1 rounded-md bg-secondary border border-border/50 text-xs font-semibold text-muted-foreground'>
            <Star className="w-3.5 h-3.5 text-yellow-500" />
            {data.score ?? 'N/A'}
          </span>
          
          <span data-reveal-element className='flex items-center gap-1.5 px-2 py-1 rounded-md bg-secondary border border-border/50 text-xs font-semibold text-muted-foreground'>
            <Heart className="w-3.5 h-3.5 text-[crimson]" />
            {data.favorites ?? 0}
          </span>
          
          <span data-reveal-element className='flex items-center gap-1.5 px-2 py-1 rounded-md bg-secondary border border-border/50 text-xs font-semibold text-muted-foreground'>
            <Book className="w-3.5 h-3.5 text-blue-500" />
            {data.chapters ?? 0}
          </span>
        </div>

        {/* Genres/Tags Row */}
        <div className='flex items-center flex-wrap gap-1.5 mb-5'>
          {genData.slice(0, 4).map((item) => (
            <span 
              data-reveal-element 
              className='text-[11px] font-medium px-2 py-0.5 bg-background border border-border rounded-full text-foreground/80 flex items-center gap-1' 
              key={item.mal_id}
            >
              {genreEmoji[item.name] ?? '📖'} {item.name}
            </span>
          ))}
        </div>

        {/* Action Button */}
        <div data-reveal-element className='mt-2 flex items-center justify-center'>
          <Link href={`/mangas/${data.title}-${data.mal_id}`} className="w-full">
            <ButtonSpin />
          </Link>
        </div>
        
      </div>
    </div>
  );
};

export default MangaCard;