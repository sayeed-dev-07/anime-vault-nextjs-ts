'use client';

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect, Suspense } from "react";
import { Search } from "lucide-react";

const SearchBarComponent = () => {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const urlValue = pathname === "/search"
        ? searchParams.get("name") ?? ""
        : "";

    const [value, setValue] = useState(urlValue);

    useEffect(() => {
        setValue(urlValue);
    }, [urlValue]);

    const handleSearch = () => {
        const query = value.trim().toLowerCase();
        if (!query) return;

        router.push(`/search?name=${encodeURIComponent(query)}`);
    };

    return (
        <form
            onSubmit={(e) => {
                e.preventDefault();
                handleSearch();
            }}
            // Takes full width in mobile drawer, fixed width on desktop
            className="relative flex items-center w-full md:w-72 lg:w-96 group"
        >
            <Search className="absolute left-3 h-4 w-4 text-muted-foreground group-focus-within:text-[#e6392d] transition-colors" />
            
            <input
                value={value}
                onChange={(e) => setValue(e.target.value)}
                type="search"
                placeholder="Search..."
                className="w-full pl-9 pr-3 py-2 text-xs font-extrabold tracking-wider uppercase bg-card border-2 border-foreground rounded-none outline-none transition-all duration-300 placeholder:text-muted-foreground focus:border-[#e6392d] focus:ring-2 focus:ring-[#e6392d] text-foreground shadow-[3px_3px_0_var(--foreground)]"
            />
        </form>
    );
};

export default function SearchBar() {
    return (
        <Suspense fallback={
            <div className="relative flex items-center w-full md:w-72 lg:w-96">
                <Search className="absolute left-3 h-4 w-4 text-muted-foreground" />
                <input
                    disabled
                    placeholder="Loading..."
                    className="w-full pl-9 pr-3 py-2 text-xs font-extrabold tracking-wider uppercase bg-card border-2 border-foreground rounded-none outline-none opacity-50 cursor-not-allowed text-foreground"
                />
            </div>
        }>
            <SearchBarComponent />
        </Suspense>
    );
}
