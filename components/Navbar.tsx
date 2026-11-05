import Link from "next/link";
import { ModeToggle } from "./ModeToggle";
import SearchBar from "./Searchbar";
import MobileMenu from "./MobileMenu";

const Navbar = () => {
  return (
    <div className="px-4 md:px-8 h-20 sm:h-[90px] fixed top-0 w-full flex items-center justify-between border-b-[3px] border-border z-50 bg-background/95 backdrop-blur-md">
      
      <div className="flex items-center">
        {/* Mobile Hamburger Trigger */}
        <MobileMenu />

        {/* Logo */}
        <Link href="/" className="comic-heading text-xl sm:text-3xl uppercase text-foreground group leading-none">
          <span className="text-[#e6392d]">Ani</span>Search<span className="text-[#e6392d] opacity-0 group-hover:opacity-100 transition-opacity">!</span>
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
