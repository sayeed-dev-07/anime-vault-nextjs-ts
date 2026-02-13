'use client'

import React, { useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import { Anime } from './FetchAnime';
import FormatSegment from './Format';
import ButtonSpin from './Button';
import FavButton from './FavButton';
import { genreEmoji } from '@/public/data/EmojiData';

gsap.registerPlugin(useGSAP, ScrollTrigger);

const AnimeCard = ({ data }: { data: Anime }) => {
  const cardRef = useRef<HTMLDivElement | null>(null);

  useGSAP(
    () => {
      const image = cardRef.current?.querySelector('[data-card-image]');
      const revealLayer = cardRef.current?.querySelector('[data-card-reveal]');
      const metaItems = gsap.utils.toArray<HTMLElement>('[data-card-meta]', cardRef.current);
      const tags = gsap.utils.toArray<HTMLElement>('[data-card-tag]', cardRef.current);

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: cardRef.current,
          start: 'top 88%',
          once: true,
        },
      });

      tl.fromTo(
        cardRef.current,
        { autoAlpha: 0, y: 26 },
        { autoAlpha: 1, y: 0, duration: 0.32, ease: 'power2.out' },
        0
      );

      if (image) {
        tl.fromTo(
          image,
          { autoAlpha: 0, scale: 1.14 },
          { autoAlpha: 1, scale: 1, duration: 0.72, ease: 'power3.out' },
          0.05
        );
      }

      if (revealLayer) {
        tl.to(
          revealLayer,
          { xPercent: 102, duration: 0.74, ease: 'power3.inOut' },
          0.08
        );
      }

      if (metaItems.length) {
        tl.fromTo(
          metaItems,
          { autoAlpha: 0, y: 12 },
          { autoAlpha: 1, y: 0, duration: 0.3, stagger: 0.1, ease: 'power2.out' },
          0.28
        );
      }

      if (tags.length) {
        tl.fromTo(
          tags,
          { autoAlpha: 0, y: 12 },
          { autoAlpha: 1, y: 0, duration: 0.4, stagger: 0.1, ease: 'power2.out' },
          0.35
        );
      }
    },
    { scope: cardRef }
  );

  const genData = [...data.genres, ...data.themes];

  return (
    <div
      ref={cardRef}
      className='bg-chatgpt-card overflow-hidden border border-[#b3b3b3] rounded-xl mb-3 p-2 shadow-md relative'
    >
      <div className='absolute top-3 right-4 z-5'>
        <FavButton type='Anime' data={data} />
      </div>

      <div className='relative w-full aspect-square overflow-hidden sm:aspect-4/5'>
        <div data-card-reveal className='absolute inset-0 z-10 dark:bg-[crimson] bg-[skyblue]' />
        {data.images.jpg.large_image_url ? (
          <Image
            src={data.images.jpg.large_image_url}
            sizes='100vw'
            data-card-image
            alt='img'
            fill
            loading='eager'
            className='object-cover scale-110 opacity-0'
          />
        ) : (
          <p>No img found</p>
        )}
      </div>

      <div className='flex items-center justify-between px-2 gap-y-2 mt-3'>
        <div className='flex gap-x-2 gap-y-3 flex-col'>
          <p data-card-meta className='text-xl'>
            {data.title}
          </p>
          <p data-card-meta className='px-2 w-fit rounded-md py-0.5 bg-[#22333b] text-white'>
            {'\u2764\uFE0F'}
            {data.favorites}
          </p>
        </div>

        <div className='flex items-center justify-center flex-col gap-y-3'>
          <p data-card-meta className='px-2 w-fit rounded-md py-0.5 bg-[#306983] text-white'>
            {'\u2B50'}
            {data.score}
          </p>
          <p data-card-meta className='px-2 w-fit rounded-md py-0.5 bg-[#19790c] text-white text-center text-nowrap'>
            {'\u{1F4FA}'}
            {data.type}
          </p>
        </div>
      </div>

      <div className='flex items-center flex-wrap justify-center my-4 gap-2'>
        {genData.map((item) => (
          <p data-card-tag className='text-nowrap p-2 border rounded-md' key={item.mal_id}>
            {genreEmoji[item.name] ?? '\u{1F3AC}'} {item.name}
          </p>
        ))}
      </div>

      <div data-card-meta className='flex items-center mt-3 justify-center'>
        <Link href={`/animes/${FormatSegment(data.title)}-${data.mal_id}`}>
          <ButtonSpin />
        </Link>
      </div>
    </div>
  );
};

export default AnimeCard;
