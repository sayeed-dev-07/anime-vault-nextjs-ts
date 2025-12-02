'use client'

import InfiniteScroll from "@/components/InfiniteScroll";



const Animes = () => {
   
    return (
        <div className="py-[3%]">
            <p className="text-3xl font-semibold">All Animes</p>
            <div>
                <InfiniteScroll/>
            </div>
        </div>
    );
};

export default Animes;