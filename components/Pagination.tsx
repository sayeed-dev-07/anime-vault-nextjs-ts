'use client'
import React, { useEffect, useState } from 'react';
import CharacterInfo, { CharacterRole } from './CharacterInfo';
import RecommendationCard, { Recommendation } from './RecommendationCard';
import StaffCard, { StaffProp } from './StaffCard';
type typeProp = 'characters' | 'recommendations' | 'staff';

import { Button } from './ui/button';

type dataProp = CharacterRole | Recommendation | StaffProp;

const Pagination = ({ data, limit = 8, name='animes', type}: { data: dataProp[], limit?: number, type: typeProp , name?:  'animes' | 'mangas'}) => {
  const [length, setLength] = useState(limit)
  const [visible, setVisible] = useState(data.slice(0, limit));
  useEffect(() => {
    setVisible(data.slice(0, length));
  }, [data, length]);
  return (
    <>
      <div className="my-6 grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-4">
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
        visible.length !== data.length && <div className='py-10 w-full flex items-center justify-center'>
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