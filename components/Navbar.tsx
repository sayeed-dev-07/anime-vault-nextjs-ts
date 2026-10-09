import Link from "next/link";
import { ModeToggle } from "./ModeToggle";
import SearchBar from "./Searchbar";
import MobileMenu from "./MobileMenu";

const Navbar = () => {
  return (
    <div className="px-4 md:px-8 h-20 sm:h-[90px] fixed top-0 w-full flex items-center justify-between border-b-2 border-border z-50 bg-background/95 backdrop-blur-md">
      
      <div className="flex items-center">
        {/* Mobile Hamburger Trigger */}
        <MobileMenu />

        {/* Logo */}
        <Link href="/" className="text-2xl sm:text-4xl font-black uppercase tracking-tighter text-foreground group">
          <span className="text-[crimson]">Ani</span>Search<span className="text-[crimson] opacity-0 group-hover:opacity-100 transition-opacity">.</span>
        </Link>
      </div>

      <div className="flex items-center gap-x-3 sm:gap-x-4">
        {/* Hide search bar on mobile (it lives in the MobileMenu now) */}
        <div className="hidden md:block">
          <SearchBar />
        </div>
        <ModeToggle />
      </div>

    </div>
  );
};

export default Navbar;