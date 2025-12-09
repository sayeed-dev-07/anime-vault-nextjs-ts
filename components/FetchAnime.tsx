'use client'
import {
  useQuery,
} from '@tanstack/react-query'
import AnimeCard from "./AnimeCard";
import MangaCard from "./MangaCard";
import { fetchData } from './Fetch';
import Loading from '@/app/loading';


interface inputProp {
  limit: number,
  top: boolean,
  type: 'anime' | 'manga'
}


export interface Manga {
  mal_id: number,
  images: AnimeImages,
  title: string,
  title_english: string,
  chapters: number,
  volumes: number,
  score: number,
  favorites: number
}


export interface AnimeResponse {
  data: Anime[];
}
export interface Anime {
  mal_id: number;
  images: AnimeImages;
  title: string;
  title_english: string | null;
  title_japanese: string | null;
  title_synonyms: string[];
  type: string | null;

  episodes: number | null;
  status: string | null;
  rating: string | null;
  score: number | null;
  rank: number | null;
  popularity: number | null;
  members: number | null;
  favorites: number | null;
  genres: NameLink[];

}

/* ---- Sub Models ---- */

export interface AnimeImages {
  jpg: ImageFormat;
  webp: ImageFormat;
}

export interface ImageFormat {
  image_url: string | null;
  small_image_url: string | null;
  large_image_url: string | null;
}

export interface Title {
  type: string;
  title: string;
}

export interface NameLink {
  mal_id: number;
  type: string;
  name: string;
  url: string;
}


const FetchAnime = ({ limit = 8, top = false, type = 'anime' }: inputProp) => {
  let baseURL = 'https://api.jikan.moe/v4/';

  baseURL = top
    ? `${baseURL}top/${type}?limit=${limit}`
    : `${baseURL}${type}?limit=${limit}`;

  const { isPending, isError, data, error } = useQuery({
    queryKey: ["anime", type, limit, top],
    queryFn: () => fetchData(baseURL),
    staleTime: 60 * 1000 
  })

  if (isPending) {
    return <Loading />
  }

  if (isError) {
    return <span>Error: {error.message}</span>
  }


  return (
    <div className="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-3">
      {type === "anime"
        ? data.map((item: Anime) => <AnimeCard key={item.mal_id} data={item} />)
        : data.map((item: Manga) => <MangaCard key={item.mal_id} data={item} />)
      }
    </div>
  );
};

export default FetchAnime;
