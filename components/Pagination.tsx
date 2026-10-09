'use client'
import React, { useEffect, useRef, useState } from 'react';
import CharacterInfo, { CharacterRole } from './CharacterInfo';
import RecommendationCard, { Recommendation } from './RecommendationCard';
import StaffCard, { StaffProp } from './StaffCard';
import { Button } from './ui/button';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ChevronDown } from 'lucide-react';

gsap.registerPlugin(useGSAP, ScrollTrigger);

type typeProp = 'characters' | 'recommendations' | 'staff';
type dataProp = CharacterRole | Recommendation | StaffProp;

const Pagination = ({ data, limit = 12, name = 'animes', type }: { data: dataProp[], limit?: number, type: typeProp, name?: 'animes' | 'mangas' }) => {
  const [length, setLength] = useState(limit);
  const [visible, setVisible] = useState(data.slice(0, limit));
  const cardContainerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    setVisible(data.slice(0, length));
  }, [data, length]);

  const { contextSafe } = useGSAP({ scope: cardContainerRef });

  useEffect(() => {
    const addNewAnimations = contextSafe(() => {
      const newCards = ".smallCard:not(.revealed)";

      ScrollTrigger.batch(newCards, {
        onEnter: (batch) => {
          // STRICTLY opacity-only animation, no scaling or translation
          gsap.fromTo(batch,
            {
              autoAlpha: 0
            },
            {
              autoAlpha: 1,
              stagger: 0.1,
              duration: 0.8,
              ease: "power2.out",
              overwrite: true
            }
          );

          batch.forEach((el) => el.classList.add('revealed'));
        },
        once: true
      });

      ScrollTrigger.refresh();
    });

    addNewAnimations();
  }, [visible, contextSafe]);

  return (
    <>
      <div ref={cardContainerRef} className="my-6 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 sm:gap-6 items-start">
        {
          type === "characters" &&
          visible.map((item) => {
            const character = item as CharacterRole;
            return (
              <CharacterInfo
                key={character.character.mal_id}
                CharacterData={character}
              />
            );
          })
        }
        {
          type === "recommendations" &&
          visible.map((item) => {
            const recomData = item as Recommendation;
            return (
              <RecommendationCard
                name={name}
                key={recomData.entry.mal_id}
                data={recomData}
              />
            );
          })
        }
        {
          type === "staff" &&
          visible.map((item) => {
            const staffData = item as StaffProp;
            return (
              <StaffCard
                key={staffData.person.mal_id}
                Staff={staffData}
              />
            );
          })
        }
      </div>

      {/* Styled Load More Button - Brutalist / Editorial Style */}
      {
        visible.length < data.length &&
        <div className='pt-8 pb-12 w-full flex items-center justify-center'>
          <Button
            onClick={() => setLength((prev) => prev + limit)}
            className='
              cursor-pointer group flex items-center justify-center gap-3
              w-full sm:w-[300px] h-12 
              rounded-none border border-foreground bg-transparent text-foreground 
              transition-all duration-300 ease-out
              hover:bg-foreground hover:text-background
              uppercase tracking-[0.2em] text-[10px] font-bold
            '
          >
            Load More
            <ChevronDown className="w-4 h-4 transition-transform duration-300 group-hover:translate-y-1 group-hover:text-[crimson]" />
          </Button>
        </div>
      }
    </>
  );
};

export default Pagination;