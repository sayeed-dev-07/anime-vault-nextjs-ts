'use client'

import React, { useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import { Manga } from './FetchAnime';
import ButtonSpin from './Button';
import FavButton from './FavButton';
import { genreEmoji } from '@/public/data/EmojiData';

gsap.registerPlugin(useGSAP, ScrollTrigger);

const MangaCard = ({ data }: { data: Manga }) => {
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
        force3D: true
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
      className='bg-chatgpt-card border border-[#b3b3b3] mb-3 rounded-xl p-2 shadow-md hover:shadow-xl transition-all duration-200 ease-linear will-change-auto group relative overflow-hidden'
    >
      <div className='absolute top-3 right-4 z-5'>
        <FavButton type='Manga' data={data} />
      </div>

      <div className='relative w-full aspect-square overflow-hidden sm:aspect-4/5'>
        <div data-card-reveal className='absolute inset-0 z-10 bg-foreground will-change-transform' />
        {data.images.jpg.large_image_url ? (
          <Image
            src={data.images.jpg.large_image_url}
            loading='eager'
            sizes='100vw 100vh'
            alt='img'
            fill
            data-card-image
            className='object-cover rounded-t-xl scale-110 opacity-0'
          />
        ) : (
          <p>No img found</p>
        )}
      </div>

      <div className='flex items-center justify-between px-2 mt-3'>
        <div className='flex gap-y-3 flex-col'>
          <p data-card-meta className='text-xl will-change-transform'>
            {data.title}
          </p>
          <p data-card-meta className='px-2 w-fit rounded-md py-0.5 bg-[#22333b] text-white will-change-transform'>
            {'\u2764\uFE0F'}
            {data.favorites}
          </p>
        </div>

        <div className='flex items-center justify-center flex-col gap-y-3'>
          <p data-card-meta className='px-2 w-fit rounded-md py-0.5 bg-[#306983] text-white will-change-transform'>
            {'\u2B50'}
            {data.score}
          </p>
          <p data-card-meta className='px-2 w-fit rounded-md py-0.5 bg-[#19790c] text-white will-change-transform'>
            {'\u{1F4C4}'}
            {data.chapters ? data.chapters : 0}
          </p>
        </div>
      </div>

      <div className='flex items-center flex-wrap justify-center my-4 gap-2'>
        {genData.map((item) => (
          <p data-card-tag className='text-nowrap will-change-transform p-2 border rounded-md' key={item.mal_id}>
            {genreEmoji[item.name] ?? '\u{1F3AC}'} {item.name}
          </p>
        ))}
      </div>

      <div data-card-meta className='flex items-center mt-3 justify-center will-change-transform'>
        <Link className='flex items-center justify-center' href={`/mangas/${data.title}-${data.mal_id}`}>
          <ButtonSpin />
        </Link>
      </div>
    </div>
  );
};

export default MangaCard;
