'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { usePathname } from 'next/navigation';
import SideBar from './SideBar';
import SearchBar from './Searchbar';

export default function MobileMenu() {
    const [isOpen, setIsOpen] = useState(false);
    const drawerRef = useRef<HTMLDivElement>(null);
    const overlayRef = useRef<HTMLDivElement>(null);
    const pathname = usePathname();

    // Automatically close the menu when the route changes
    useEffect(() => {
        setIsOpen(false);
    }, [pathname]);

    // Prevent scrolling on the main page when menu is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => { document.body.style.overflow = 'unset'; };
    }, [isOpen]);

    useGSAP(() => {
        if (isOpen) {
            gsap.to(overlayRef.current, { autoAlpha: 1, duration: 0.3, ease: 'power2.out' });
            // Slide in from left
            gsap.to(drawerRef.current, { x: 0, duration: 0.5, ease: 'expo.out' });
        } else {
            // Slide out to left
            gsap.to(drawerRef.current, { x: '-100%', duration: 0.4, ease: 'expo.inOut' });
            gsap.to(overlayRef.current, { autoAlpha: 0, duration: 0.3, ease: 'power2.in', delay: 0.1 });
        }
    }, [isOpen]);

    return (
        <div className="xl:hidden flex items-center">
            {/* Brutalist Hamburger Button */}
            <button
                onClick={() => setIsOpen(true)}
                className="w-9 h-9 sm:w-10 sm:h-10 border border-border bg-transparent flex items-center justify-center text-foreground hover:bg-foreground hover:text-background transition-colors mr-3 sm:mr-4 rounded-none cursor-pointer"
                aria-label="Open Menu"
            >
                <Menu className="w-5 h-5" />
            </button>

            {/* Backdrop Overlay */}
            <div
                ref={overlayRef}
                onClick={() => setIsOpen(false)}
                className="fixed inset-0 bg-background/80 backdrop-blur-sm z-[100] invisible cursor-pointer"
            />

            {/* Sliding Drawer (Uses 100dvh to fix iOS Safari cutoffs) */}
            <div
                ref={drawerRef}
                className="fixed top-0 left-0 w-[280px] h-[100dvh] bg-background border-r-2 border-border z-[101] -translate-x-full flex flex-col"
            >
                {/* Drawer Header */}
                <div className="flex items-center justify-between p-4 border-b border-border shrink-0 h-20 sm:h-[90px]">
                    <span className="text-2xl font-black uppercase tracking-tighter text-foreground">
                        <span className="text-[crimson]">Ani</span>Search<span className="text-[crimson]">.</span>
                    </span>
                    <button
                        onClick={() => setIsOpen(false)}
                        className="w-8 h-8 border border-border flex items-center justify-center hover:bg-[crimson] hover:text-white hover:border-[crimson] transition-colors rounded-none cursor-pointer"
                    >
                        <X className="w-4 h-4" />
                    </button>
                </div>

                {/* Search Bar for Touch Screens */}
                <div className="p-4 border-b border-border shrink-0 md:hidden block">
                    <SearchBar />
                </div>

                {/* Drawer Content */}
                <div className="flex-1 overflow-y-auto py-6 custom-scrollbar">
                    <SideBar />
                </div>
            </div>
        </div>
    );
}