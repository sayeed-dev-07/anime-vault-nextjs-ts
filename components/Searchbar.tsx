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
            className="flex items-center gap-x-2"
        >
            <input
                value={value}
                onChange={(e) => setValue(e.target.value)}
                type="search"
                placeholder="Search anything..."
                className="border px-2 py-1 rounded-md bg-input text-lg outline-none w-40 sm:w-[260px]"
            />

            <button type="submit" aria-label="Search">
                <Search className="cursor-pointer" />
            </button>
        </form>
    );
};

const SearchBar = () => {
    return (
        <Suspense fallback={
            <div className="flex items-center gap-x-2">
                <input
                    disabled
                    placeholder="Search anything..."
                    className="border px-2 py-1 rounded-md bg-input text-lg outline-none w-40 sm:w-[260px]"
                />
            </div>
        }>
            <SearchBarComponent />
        </Suspense>
    );
};

export default SearchBar;