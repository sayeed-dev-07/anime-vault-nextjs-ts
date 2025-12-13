
import Link from "next/link";
import { ModeToggle } from "./ModeToggle";
import SearchBar from "./Searchbar";



const Navbar = () => {
  return (
    <div className="px-2 md:px-[2%] h-20 sm:h-[90px] fixed w-full p-6 border-b z-10 backdrop-blur-sm bg-background/300">
      <div className="flex items-center justify-between gap-x-5">

        <Link href="/" className="text-primary sm:text-3xl text-xl font-bold">
          <span className="text-[crimson]">Ani</span>Search
        </Link>

        <div className="flex items-center gap-x-2">
          {/* Search is isolated */}
          <SearchBar />
          <ModeToggle />
        </div>

      </div>
    </div>
  );
};

export default Navbar;