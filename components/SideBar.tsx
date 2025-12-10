"use client";

import { Heart, Home, MedalIcon, Tv } from "lucide-react";
import Link from "next/link";
import { BiCategory } from "react-icons/bi";
import { usePathname } from "next/navigation";

const SideBar = () => {
  const pathname = usePathname();

  const activeClass = (path: string) => {
    const isHomeActive = path === "/" && pathname === "/";
    const isRouteActive = path !== "/" && pathname.startsWith(path);

    return (isHomeActive || isRouteActive)
      ? "bg-black text-white font-semibold rounded-md px-3 py-2"
      : "bg-transparent text-black dark:text-white hover:bg-neutral-200 dark:hover:bg-neutral-800 rounded-md px-3 py-2 transition-colors";
  };

  return (
    <div className="w-full mx-1 flex lg:flex-col items-start font-medium text-lg mt-4">
      <div className="flex flex-col gap-y-4 w-full">


        {/* Main */}
        <div className="flex flex-wrap lg:flex-col gap-2">
          <Link href="/" className={`${activeClass("/")} flex items-center gap-2`}>
            <Home size={20} /> Home
          </Link>

          <Link href="/favourite" className={`${activeClass("/favourite")} flex items-center gap-2`}>
            <Heart size={20} /> Favourite
          </Link>
        </div>

        {/* Anime Section */}
        <p className="text-[15px] text-red-500 font-semibold">Anime</p>
        <div className="flex flex-wrap lg:flex-col gap-2">
          <Link href="/animes" className={`${activeClass("/animes")} flex items-center gap-2`}>
            <Tv size={20} /> All Animes
          </Link>

          <Link href="/top-animes" className={`${activeClass("/top-animes")} flex items-center gap-2`}>
            <MedalIcon size={20} /> Top Animes
          </Link>

          <Link href="/genres-anime" className={`${activeClass("/genres-anime")} flex items-center gap-2`}>
            <BiCategory size={20} /> Genres
          </Link>
        </div>

        {/* Manga Section */}
        <p className="text-[15px] text-red-500 font-semibold">Manga</p>
        <div className="flex flex-wrap lg:flex-col gap-2 mb-6">
          <Link href="/mangas" className={`${activeClass("/mangas")} flex items-center gap-2`}>
            <Tv size={20} /> All Mangas
          </Link>

          <Link href="/top-mangas" className={`${activeClass("/top-mangas")} flex items-center gap-2`}>
            <MedalIcon size={20} /> Top Mangas
          </Link>

          <Link href="/genres-manga" className={`${activeClass("/genres-manga")} flex items-center gap-2`}>
            <BiCategory size={20} /> Genres
          </Link>
        </div>

      </div>
    </div>
  );
};

export default SideBar;
