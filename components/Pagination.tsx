'use client'
import React, { useEffect, useRef, useState } from 'react';
import CharacterInfo, { CharacterRole } from './CharacterInfo';
import RecommendationCard, { Recommendation } from './RecommendationCard';
import StaffCard, { StaffProp } from './StaffCard';
import { Button } from './ui/button';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(useGSAP, ScrollTrigger);

type typeProp = 'characters' | 'recommendations' | 'staff';
type dataProp = CharacterRole | Recommendation | StaffProp;

const Pagination = ({ data, limit = 8, name = 'animes', type }: { data: dataProp[], limit?: number, type: typeProp, name?: 'animes' | 'mangas' }) => {
  const [length, setLength] = useState(limit);
  const [visible, setVisible] = useState(data.slice(0, limit));
  const cardContainerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    setVisible(data.slice(0, length));
  }, [data, length]);

  // 1. Setup GSAP Context (Run once on mount)
  const { contextSafe } = useGSAP({ scope: cardContainerRef });

  // 2. Handle New Items Only
  useEffect(() => {
    // contextSafe ensures these new triggers are cleaned up when the component unmounts
    const addNewAnimations = contextSafe(() => {
      
      // Target only cards that haven't been 'revealed' yet
      const newCards = ".smallCard:not(.revealed)";

      ScrollTrigger.batch(newCards, {
        onEnter: (batch) => {
          // Animate the batch
          gsap.fromTo(batch, 
            { 
              autoAlpha: 0, 
              y: 60 
            },
            { 
              autoAlpha: 1, 
              y: 0, 
              stagger: 0.1, 
              duration: 0.5,
              ease: "power2.out",
              overwrite: true // Prevent conflicts
            }
          );
          
          // Mark these elements as processed so they aren't picked up again
          batch.forEach((el) => el.classList.add('revealed'));
        },
        once: true // Only trigger once
      });
      
      // Recalculate scroll positions for the new content
      ScrollTrigger.refresh();
    });

    addNewAnimations();

  }, [visible, contextSafe]); // Runs whenever 'visible' updates

  return (
    <>
      <div ref={cardContainerRef} className="my-6 grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-4">
        {
          type === "characters" &&
          visible.map((item) => {
            const character = item as CharacterRole;
            return (
              <CharacterInfo
                // Key MUST be unique to prevent React from re-creating DOM nodes
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
              <RecommendationCard name={name}
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
      {
        visible.length !== data.length && 
        <div className='py-10 w-full flex items-center justify-center'>
          <div onClick={() => setLength((prev) => prev + limit)}>
            <Button className='cursor-pointer'>
              Load More
            </Button>
          </div>
        </div>
      }
    </>
  );
};

export default Pagination;