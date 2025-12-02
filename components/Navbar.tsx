import Link from "next/link";
import { BiHeart } from "react-icons/bi";
import { FaHeart, FaShoppingCart } from "react-icons/fa";

const Navbar = () => {
    return (
        <div className="bg-[#708d81] h-20 text-[#1c2321] flex items-center justify-between px-2 sm:px-[5%] md:px-[10%]">
            <div>
                <Link href='/' className="text-2xl sm:text-4xl font-semibold">Anime Vault</Link>
            </div>
            <div className="flex items-center justify-center gap-x-3">
                <div>
                    <Link href='/cart'>
                        <FaShoppingCart size={32} />
                    </Link>
                </div>
                <div>
                    <Link href='/faviourite'>
                        <FaHeart size={32} />
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Navbar;