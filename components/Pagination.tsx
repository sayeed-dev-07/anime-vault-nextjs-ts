"use client";

import { useState } from "react";
import CharacterInfo from "./CharacterInfo";
import RecommendationCard from "./RecommendationCard";
type typeNameProp = 'character' | 'staff' | 'more'

type PaginationProps<T> = {
  AllData: T[];
  pageSize?: number;
  name?: typeNameProp
};

function Pagination<T>({ AllData, pageSize = 12, name = 'character' }: PaginationProps<T>) {
  const [page, setPage] = useState(1);

  const visible = AllData.slice(0, page * pageSize);

  const hasMore = visible.length < AllData.length;

  return (
    <div>
      {/* Render items */}
      <div className="my-6 grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-4">
        {
            name === 'character' && 
            <CharacterInfo CharacterData={visible}/>
        }
        {
            name === 'more' && 
            <RecommendationCard data={visible} name="animes"/>
        }
      </div>

      {/* Load more */}
      {hasMore && (
        <button
          onClick={() => setPage((p) => p + 1)}
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded"
        >
          Load More
        </button>
      )}
    </div>
  );
}

export default Pagination;
