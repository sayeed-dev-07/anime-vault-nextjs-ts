"use client";

import { Heart, Home, MedalIcon, Tv, Book } from "lucide-react";
import Link from "next/link";
import { BiCategory } from "react-icons/bi";
import { usePathname } from "next/navigation";

const SideBar = () => {
  const pathname = usePathname();

  const activeClass = (path: string) => {
    const isHomeActive = path === "/" && pathname === "/";
    const isRouteActive = path !== "/" && pathname.startsWith(path);

    return (isHomeActive || isRouteActive)
      ? "bg-[#e6392d] text-white font-extrabold border-l-[5px] border-[#f9c846] shadow-[3px_3px_0_var(--foreground)]"
      : "text-foreground border-l-[5px] border-transparent hover:bg-[#f9c846] hover:text-[#161616] hover:border-[#e6392d] font-bold transition-all duration-200";
  };

  const linkBaseClass = "flex items-center gap-3 px-4 py-3 text-xs sm:text-sm uppercase tracking-wider w-full";
  const sectionHeaderClass = "text-[10px] font-black uppercase tracking-[0.14em] text-foreground border-b-2 border-border pb-2 mb-2 px-4 mt-8 first:mt-0";

  return (
    // STRICT flex-col layout fixes the bug where links disappear off-screen on mobile
    <nav className="w-full flex flex-col gap-1 pb-8">

      {/* Main Section */}
      <Link href="/" className={`${linkBaseClass} ${activeClass("/")}`}>
        <Home size={16} className="shrink-0" /> Home
      </Link>
      <Link href="/favourite" className={`${linkBaseClass} ${activeClass("/favourite")}`}>
        <Heart size={16} className="shrink-0" /> Favorites
      </Link>

      {/* Anime Section */}
      <p className={sectionHeaderClass}>Anime Catalog</p>
      <Link href="/animes" className={`${linkBaseClass} ${activeClass("/animes")}`}>
        <Tv size={16} className="shrink-0" /> Database
      </Link>
      <Link href="/top-animes" className={`${linkBaseClass} ${activeClass("/top-animes")}`}>
        <MedalIcon size={16} className="shrink-0" /> Top Rated
      </Link>
      <Link href="/genres-anime" className={`${linkBaseClass} ${activeClass("/genres-anime")}`}>
        <BiCategory size={16} className="shrink-0" /> Genres
      </Link>

      {/* Manga Section */}
      <p className={sectionHeaderClass}>Manga Catalog</p>
      <Link href="/mangas" className={`${linkBaseClass} ${activeClass("/mangas")}`}>
        <Book size={16} className="shrink-0" /> Database
      </Link>
      <Link href="/top-mangas" className={`${linkBaseClass} ${activeClass("/top-mangas")}`}>
        <MedalIcon size={16} className="shrink-0" /> Top Rated
      </Link>
      <Link href="/genres-manga" className={`${linkBaseClass} ${activeClass("/genres-manga")}`}>
        <BiCategory size={16} className="shrink-0" /> Genres
      </Link>

    </nav>
  );
};

export default SideBar;
