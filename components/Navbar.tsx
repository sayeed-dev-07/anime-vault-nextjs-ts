import Link from "next/link";
import { BiHeart } from "react-icons/bi";
import { FaHeart, FaShoppingCart } from "react-icons/fa";

const Navbar = () => {
    return (
        <div className="bg-[#708d81] h-20 text-[#f7fff7] flex items-center justify-between px-[10%]">
            <div>
                <Link href='/' className="text-4xl font-semibold">Anime Vault</Link>
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