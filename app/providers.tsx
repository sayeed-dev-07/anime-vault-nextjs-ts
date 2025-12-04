'use client'

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";

export const getFullLink = (link: string)=>{
    return `https://shikimori.one/${link}`
}


const Providers = ({ children }: { children: React.ReactNode }) => {
    const [queryClient] = useState(() => new QueryClient());
    return (
        <QueryClientProvider client={queryClient}>
                {children}
        </QueryClientProvider>
    );
};

export default Providers;