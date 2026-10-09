'use client'

import React, { useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Star, Heart, ArrowUpRight } from 'lucide-react';

import { Anime } from './FetchAnime';
import FormatSegment from './Format';
import FavButton from './FavButton';

gsap.registerPlugin(useGSAP, ScrollTrigger);

const AnimeCard = ({ data }: { data: Anime }) => {
  const cardRef = useRef<HTMLAnchorElement | null>(null);

  useGSAP(() => {
    const card = cardRef.current;
    if (!card) return;

    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      gsap.fromTo(
        card,
        { autoAlpha: 0, y: 20 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.6,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: card,
            start: 'top 90%',
            once: true,
          },
        }
      );
    });

    mm.add("(prefers-reduced-motion: reduce)", () => {
      gsap.to(card, {
        autoAlpha: 1,
        duration: 0.4,
        scrollTrigger: { trigger: card, start: 'top 90%', once: true },
      });
    });

    return () => mm.revert();
  }, { scope: cardRef });

  return (
    <Link
      href={`/animes/${FormatSegment(data.title)}-${data.mal_id}`}
      ref={cardRef}
      className='group my-3 relative flex flex-col invisible  w-full'
    >
      {/* 
        Floating Favorite Button 
        Visible by default on mobile. On md+ screens, it starts at opacity-0 and fades in on hover.
      */}
      <div
        className='absolute top-2 right-2 z-20 transition-opacity duration-300 opacity-100 md:opacity-0 md:group-hover:opacity-100'
        onClick={(e) => e.preventDefault()}
      >
        <FavButton type='Anime' data={data} />
      </div>

      <div className='relative w-full aspect-[3/4] max-h-[320px] overflow-hidden rounded-md bg-muted/30 mb-3 shadow-sm'>
        {data.images?.jpg?.large_image_url ? (
          <Image
            src={data.images.jpg.large_image_url}
            sizes='(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw'
            alt={data.title || 'Anime Image'}
            fill
            className='object-cover transition-transform duration-700 ease-out md:group-hover:scale-105'
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-muted-foreground text-xs">
            No image
          </div>
        )}

        {/* Hover overlay isolated to md+ screens */}
        <div className="absolute inset-0 bg-black/0 transition-colors duration-300 md:group-hover:bg-black/10" />
      </div>

      <div className='flex flex-col px-1'>

        <div className="flex justify-between items-start gap-2 mb-1">
          <h3 className='text-sm sm:text-base font-semibold leading-snug line-clamp-2 text-foreground transition-colors md:group-hover:text-[crimson]'>
            {data.title}
          </h3>
          {/* Arrow visible statically on mobile. Animated only on md+ */}
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
        </div>

      </div>
    </Link>
  );
};

export default AnimeCard;