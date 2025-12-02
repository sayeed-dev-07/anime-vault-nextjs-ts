'use client'

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";
import { ContextApi } from "./context";




const Providers = ({ children }: { children: React.ReactNode }) => {
    const [queryClient] = useState(() => new QueryClient());
    return (
        <QueryClientProvider client={queryClient}>
            <ContextApi>
                {children}
            </ContextApi>
        </QueryClientProvider>
    );
};

export default Providers;