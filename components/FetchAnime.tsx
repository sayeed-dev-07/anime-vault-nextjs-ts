'use client'
import {
  useQuery,
} from '@tanstack/react-query'
import AnimeCard from "./AnimeCard";
import MangaCard from "./MangaCard";
import Loading from '@/app/loading';
import Error from './Error';
import { fetchData } from './Fetch';

interface inputProp {
  limit?: number,
  top?: boolean,
  type?: 'anime' | 'manga'
}

export interface Manga {
  mal_id: number,
  images: AnimeImages,
  title: string,
  title_english: string,
  chapters: number,
  volumes: number,
  score: number,
  favorites: number,
  genres: NameLink[],
  themes: NameLink[]
}

export interface AnimeResponse {
  data: Anime[];
}

export interface Anime {
  mal_id: number;
  url: string;
  images: {
    jpg: {
      image_url: string;
      small_image_url: string;
      large_image_url: string;
    };
    webp: {
      image_url: string;
      small_image_url: string;
      large_image_url: string;
    };
  };
  title: string;
  type: string;
  score: number | null;
  favorites: number;
  genres: Array<{
    mal_id: number;
    type: string;
    name: string;
    url: string;
  }>;
  themes: Array<{
    mal_id: number;
    type: string;
    name: string;
    url: string;
  }>;
}

// You can also add this interface if you need to type the full API response
export interface ApiResponse {
  pagination: {
    last_visible_page: number;
    has_next_page: boolean;
    current_page: number;
    items: {
      count: number;
      total: number;
      per_page: number;
    };
  };
  data: Anime[] | Manga[];
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
  // Added trailing slash to ensure correct URL generation
  let baseURL = 'https://api.tenrai.org/v1/';

  baseURL = top
    ? `${baseURL}top/${type}?limit=${limit}`
    : `${baseURL}${type}?limit=${limit}`;

  const { isPending, isError, data } = useQuery({
    queryKey: ["anime", type, limit, top],
    queryFn: () => fetchData(baseURL),
    staleTime: 60 * 1000
  })

  if (isPending) {
    return <Loading />
  }

  if (isError) {
    return <Error />
  }

  // The new API wraps the array inside a `data` property.
  // We use optional chaining safely to extract it, falling back to an empty array.
  const fetchedItems = data || [];

  return (
    <div className="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-3">
      {type === "anime"
        ? fetchedItems.map((item: Anime) => <AnimeCard key={item.mal_id} data={item} />)
        : fetchedItems.map((item: Manga) => <MangaCard key={item.mal_id} data={item} />)
      }
    </div>
  );
};

export default FetchAnime;