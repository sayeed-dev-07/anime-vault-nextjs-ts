'use client'

import InfiniteScroll from "@/app/components/InfiniteScroll";
import { useState } from "react";
import { AnimeProp } from "../page";
import { useSearchParams, useRouter } from "next/navigation";

const Animes = () => {
  const params = useSearchParams();
  const router = useRouter();

  const query = params.get("search") ?? "";
  const [inputValue, setInputValue] = useState(query);
  const [animes, setAnimes] = useState<AnimeProp[]>([]);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setInputValue(e.target.value);
  }

  function handleSearch() {
    const val = inputValue.trim().toLowerCase();
    router.push(`/animes?search=${val}`);
    setAnimes([]);
  }

  return (
    <div className="py-[1%]">
      <div className="py-[5%] sm:py-[3%] flex items-center justify-center flex-wrap gap-y-1.5 gap-x-3">
        <input
          value={inputValue}
          onChange={handleChange}
          onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          className="text-xl text-black px-1 py-0.5 outline-none bg-white rounded-sm"
          type="text"
        />
        <button
          onClick={handleSearch}
          className="px-2 py-0.5 bg-black text-white text-xl cursor-pointer rounded-sm"
        >
          Search
        </button>
      </div>

      <p className="text-3xl text-black font-semibold mb-3">
        {query ? `Search Result For: ${query}` : "All Animes"}
      </p>

      <div>
        <InfiniteScroll
          animes={animes}
          setAnimes={setAnimes}
          linkData={
            query
              ? `https://shikimori.one/api/animes?search=${query}&page=`
              : `https://shikimori.one/api/animes?page=`
          }
        />
      </div>
    </div>
  );
};

export default Animes;
