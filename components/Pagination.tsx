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
          gsap.fromTo(batch, 
            { 
              autoAlpha: 0, 
              y: 30,
              scale: 0.95
            },
            { 
              autoAlpha: 1, 
              y: 0,
              scale: 1, 
              stagger: 0.08, 
              duration: 0.6,
              ease: "back.out(1.2)",
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
      {/* Fully responsive grid for smaller cards */}
      <div ref={cardContainerRef} className="my-6 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 sm:gap-6 items-start">
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

      {/* Styled Load More Button */}
      {
        visible.length < data.length && 
        <div className='pt-6 pb-10 w-full flex items-center justify-center'>
          <Button 
            onClick={() => setLength((prev) => prev + limit)}
            size="lg"
            className='cursor-pointer gap-2 font-semibold px-8 bg-secondary text-secondary-foreground hover:bg-secondary/80 border border-border shadow-sm'
          >
            Load More <ChevronDown className="w-5 h-5" />
          </Button>
        </div>
      }
    </>
  );
};

export default Pagination;