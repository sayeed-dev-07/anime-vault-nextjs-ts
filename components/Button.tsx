/* eslint-disable react-hooks/set-state-in-effect */
'use client'

import React, { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { Button } from './ui/button';
import Spinner from './Spinner'; // Using your newly created custom spinner
import { ChevronRight } from 'lucide-react';

interface ButtonSpinProps {
    text?: string;
}

const ButtonSpin = ({ text = 'Details' }: ButtonSpinProps) => {
    const [loading, setLoading] = useState(false);
    const pathname = usePathname();

    // Automatically reset the loading state whenever the URL path changes.
    // This prevents the button from being permanently stuck on "Loading..." 
    // if the user navigates away and then presses the browser's Back button.
    useEffect(() => {
        setLoading(false);
    }, [pathname]);

    const handleClick = () => {
        setLoading(true);
    };

    return (
        <Button 
            className="w-full cursor-pointer group transition-all duration-300 font-semibold bg-primary text-primary-foreground hover:bg-primary/90" 
            disabled={loading} 
            onClick={handleClick}
        >
            {loading ? (
                <span className="flex items-center justify-center gap-2">
                    <Spinner size="sm" className="text-primary-foreground" /> 
                    <span>Loading...</span>
                </span>
            ) : (
                <span className="flex items-center justify-center gap-1.5 w-full">
                    {text}
                    <ChevronRight className="w-4 h-4 opacity-70 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300" />
                </span>
            )}
        </Button>
    );
};

export default ButtonSpin;