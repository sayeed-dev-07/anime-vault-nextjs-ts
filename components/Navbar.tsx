import Link from "next/link";
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
                        <div className="relative">
                            <FaShoppingCart size={32} />
                            <p className="absolute -right-2 -top-1 text-white px-1.5 py-0.5
                             bg-[#000000e9] text-xs rounded-4xl">5</p>
                        </div>
                    </Link>
                </div>
                <div>
                    <Link href='/faviourite'>
                        <div className="relative">
                            <FaHeart size={32} />
                            <p className="absolute -right-2 -top-1 text-white px-1.5 py-0.5
                             bg-[#000000e9] text-xs rounded-4xl">5</p>
                        </div>

                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Navbar;