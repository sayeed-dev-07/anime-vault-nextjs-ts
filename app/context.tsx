'use client'
import React, { createContext, useState } from "react";

interface contextData {
    number: number,
    setNumber: React.Dispatch<React.SetStateAction<number>>
}



export const AnimeContext = createContext< null | contextData>(null)




export const ContextApi = ({ children }: { children: React.ReactNode }) => {
    const [number, setNumber] = useState<number>(0)
    
    return (
        <AnimeContext.Provider value={{number, setNumber}}>
            {children}
        </AnimeContext.Provider>
    );
};

