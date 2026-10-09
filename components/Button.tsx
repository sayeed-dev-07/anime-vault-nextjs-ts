/* eslint-disable react-hooks/set-state-in-effect */
'use client'

import React, { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { Button } from './ui/button';
import Spinner from './Spinner';
import { ArrowRight } from 'lucide-react';

interface ButtonSpinProps {
    text?: string;
    className?: string;
}

const ButtonSpin = ({ text = 'Details', className = '' }: ButtonSpinProps) => {
    const [loading, setLoading] = useState(false);
    const pathname = usePathname();

    // Automatically reset the loading state whenever the URL path changes.
    useEffect(() => {
        setLoading(false);
    }, [pathname]);

    const handleClick = () => {
        setLoading(true);
    };

    return (
        <Button
            className={`w-full h-11 cursor-pointer group transition-all duration-500 rounded-none border border-foreground bg-foreground text-background hover:bg-transparent hover:text-foreground uppercase tracking-[0.2em] text-[10px] font-bold ${className}`}
            disabled={loading}
            onClick={handleClick}
        >
            {loading ? (
                <span className="flex items-center justify-center gap-3">
                    <Spinner size="sm" className="text-current" />
                    <span>Loading...</span>
                </span>
            ) : (
                <span className="flex items-center justify-center gap-2 w-full">
                    {text}
                    {/* The arrow starts neutral and turns crimson while sliding right on hover */}
                    <ArrowRight className="w-3.5 h-3.5 transition-all duration-300 group-hover:translate-x-1 group-hover:text-[crimson]" />
                </span>
            )}
        </Button>
    );
};

export default ButtonSpin;