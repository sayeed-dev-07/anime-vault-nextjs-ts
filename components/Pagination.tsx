'use client'
import React, { useEffect, useState } from 'react';
import CharacterInfo, { CharacterRole } from './CharacterInfo';
import RecommendationCard, { Recommendation } from './RecommendationCard';
import StaffCard, { StaffProp } from './StaffCard';
import { typeProp } from './Fetch';
import ButtonSpin from './Button';
import { Button } from './ui/button';
type dataProp = CharacterRole | Recommendation | StaffProp;

const Pagination = ({ data, limit = 8, name }: { data: dataProp[], limit?: number, name: typeProp }) => {
  const [length, setLength] = useState(limit)
  const [visible, setVisible] = useState(data.slice(0, limit));
  useEffect(() => {
    setVisible(data.slice(0, length));
  }, [data, length]);
  return (
    <>
      <div className="my-6 grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-4">
        {
          name === "characters" &&
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
          name === "recommendations" &&
          visible.map((item) => {
            const recomData = item as Recommendation;
            return (
              <RecommendationCard
                key={recomData.entry.mal_id}
                data={recomData}
              />
            );
          })
        }
        {
          name === "staff" &&
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