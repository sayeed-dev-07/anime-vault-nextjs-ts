import React from 'react';
import { AlertTriangle } from 'lucide-react';

interface ErrorProps {
    title?: string;
    message?: string;
}

const Error = ({ 
    title = "Fetch Error", 
    message = "Something went wrong while fetching the data. Please check your connection and try again later." 
}: ErrorProps) => {
    return (
        <div className="w-full flex flex-col items-center justify-center py-12 sm:py-16 px-4 text-center bg-destructive/5 border-2 border-dashed border-destructive/20 rounded-2xl my-6">
            
            {/* Icon Container */}
            <div className="p-4 bg-destructive/10 rounded-full mb-4">
                <AlertTriangle className="w-8 h-8 sm:w-10 sm:h-10 text-destructive" />
            </div>
            
            {/* Error Text */}
            <h3 className="text-lg sm:text-xl font-bold text-destructive mb-2">
                {title}
            </h3>
            
            <p className="text-muted-foreground text-sm sm:text-base max-w-md font-medium">
                {message}
            </p>

        </div>
    );
};

export default Error;