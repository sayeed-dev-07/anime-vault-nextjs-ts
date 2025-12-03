import Link from 'next/link';
import React from 'react';

const NotFound = () => {
    return (
        <div className='min-h-[90vh] w-full flex items-center justify-center flex-col gap-y-3'>
            <p className='text-3xl font-semibold'>Looks Like You are lost</p>
            <Link className='underline text-lg' href='/'>HomePage</Link>
        </div>
    );
};

export default NotFound;