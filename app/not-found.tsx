import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const NotFound = () => {
    return (
        <div className='min-h-[90vh] w-full flex items-center justify-center  flex-col gap-y-3'>
            <Image height='200' alt='error-img' width='200' src='/notfound.jpg'/>
            <p className='text-3xl font-semibold'>Looks Like You are lost</p>
            <Link className='underline text-lg' href='/'>HomePage</Link>
        </div>
    );
};

export default NotFound;