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
      ? "bg-[crimson]/10 text-[crimson] font-bold"
      : "text-muted-foreground hover:bg-black/5 dark:hover:bg-white/10 hover:text-foreground font-medium transition-colors duration-200";
  };

  // shrink-0 prevents the buttons from compressing on mobile screens
  const linkBaseClass = "flex items-center gap-2 xl:gap-3 px-3 xl:px-4 py-2 xl:py-2.5 rounded-lg text-sm xl:text-[15px] whitespace-nowrap shrink-0";

  // Headers only show on desktop
  const sectionHeaderClass = "hidden xl:block text-[11px] font-extrabold uppercase tracking-widest text-slate-500 dark:text-slate-400 mb-1 px-4 mt-6 first:mt-0";

  return (
    <nav className="w-full flex xl:flex-col gap-2 xl:gap-1.5 overflow-x-auto xl:overflow-visible no-scrollbar px-2 xl:px-4 pb-3 xl:pb-8 items-center xl:items-stretch border-b xl:border-none border-border mb-4 xl:mb-0 flex-wrap">

      {/* Main Section */}
      <Link href="/" className={`${linkBaseClass} ${activeClass("/")}`}>
        <Home size={18} /> Home
      </Link>
      <Link href="/favourite" className={`${linkBaseClass} ${activeClass("/favourite")}`}>
        <Heart size={18} /> Favourite
      </Link>

      {/* Anime Section */}
      <p className={sectionHeaderClass}>Anime</p>
      <Link href="/animes" className={`${linkBaseClass} ${activeClass("/animes")}`}>
        <Tv size={18} /> All Animes
      </Link>
      <Link href="/top-animes" className={`${linkBaseClass} ${activeClass("/top-animes")}`}>
        <MedalIcon size={18} /> Top Animes
      </Link>
      <Link href="/genres-anime" className={`${linkBaseClass} ${activeClass("/genres-anime")}`}>
        <BiCategory size={18} /> Genres
      </Link>

      {/* Manga Section */}
      <p className={sectionHeaderClass}>Manga</p>
      <Link href="/mangas" className={`${linkBaseClass} ${activeClass("/mangas")}`}>
        <Tv size={18} /> All Mangas
      </Link>
      <Link href="/top-mangas" className={`${linkBaseClass} ${activeClass("/top-mangas")}`}>
        <MedalIcon size={18} /> Top Mangas
      </Link>
      <Link href="/genres-manga" className={`${linkBaseClass} ${activeClass("/genres-manga")}`}>
        <BiCategory size={18} /> Genres
      </Link>

    </nav>
  );
};

export default SideBar;