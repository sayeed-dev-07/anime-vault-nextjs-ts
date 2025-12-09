import { Search } from "lucide-react";
import { ModeToggle } from "./ModeToggle";
import Link from "next/link";


const Navbar = () => {
    return (
        <div className=" px-2 sm:px-[5%] md:px-[10%] h-20 sm:h-[100px] font-outfit fixed w-full p-6 border-b items-center justify-between gap-x-5 z-10 filter backdrop-blur-sm bg-background/300">
            <div className="max-w-[1400px] flex items-center justify-between mx-auto">
                <div>
                <Link href="/" className="text-primary sm:text-3xl text-xl font-bold"><span className="text-[crimson]">Ani</span>Search</Link>
            </div>

            <div className="flex items-center justify-center sm:gap-x-2">
                <div className="flex items-center sm:gap-x-2 justify-between">
                    <input className="border px-1.5 bg-input py-0.5 rounded-md w-[80%] sm:w-full text-lg sm:text-xl outline-none " type="text" />
                    <Search className="mx-2 cursor-pointer" />
                </div>
                <ModeToggle />
            </div>
            </div>
        </div>
    );
};

export default Navbar;