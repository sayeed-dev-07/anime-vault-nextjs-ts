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
            /* FIX: Starts at w-36 (144px) for mobile, expands on larger screens */
            className="relative flex items-center w-36 min-[400px]:w-44 sm:w-64 md:w-80 lg:w-96 group"
        >
            <Search className="absolute left-3 h-4 w-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
            
            <input
                value={value}
                onChange={(e) => setValue(e.target.value)}
                type="search"
                /* FIX: Shortened placeholder so it doesn't get cut off on small phones */
                placeholder="Search..."
                /* FIX: Added dark:bg-secondary to preserve dark mode compatibility */
                className="w-full pl-9 pr-3 py-2 text-sm bg-white dark:bg-secondary/50 border border-foreground/50 rounded-full outline-none transition-all duration-300 placeholder:text-muted-foreground focus:bg-white dark:focus:bg-background focus:border-primary/50 focus:ring-2 focus:ring-primary/20 text-ellipsis"
            />
        </form>
    );
};

export default function SearchBar() {
    return (
        <Suspense fallback={
            /* FIX: Matched fallback container widths to prevent layout shifts */
            <div className="relative flex items-center w-36 min-[400px]:w-44 sm:w-64 md:w-80 lg:w-96">
                <Search className="absolute left-3 h-4 w-4 text-muted-foreground" />
                <input
                    disabled
                    placeholder="Search..."
                    className="w-full pl-9 pr-3 py-2 text-sm bg-white dark:bg-secondary/50 border border-white rounded-full outline-none opacity-50 cursor-not-allowed text-ellipsis"
                />
            </div>
        }>
            <SearchBarComponent />
        </Suspense>
    );
}