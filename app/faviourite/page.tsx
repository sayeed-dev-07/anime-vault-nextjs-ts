'use client'
import { useContext } from "react";
import { AnimeContext } from "../context";




const Faviourite = () => {
    const ctx = useContext
        (AnimeContext)
    if (!ctx) return null;
    const { number, setNumber } = ctx;

    return (
        <div>
            {number}

            <div>
                <button onClick={() =>
                    setNumber((prev: number) => prev + 1)
                }>increase</button>
            </div>
        </div>
    );
};

export default Faviourite;