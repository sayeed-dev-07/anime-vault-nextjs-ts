'use client'
import React, { useState } from 'react';
import { Button } from './ui/button';
import { Spinner } from './ui/spinner';


const ButtonSpin = () => {
    const [loading, setLoading] = useState(false)
    return (
        <Button className='cursor-pointer' disabled={loading} onClick={()=> setLoading(!loading)}>
            {
                !loading ? 'Details' : <div className='flex gap-x-1  items-center'> <Spinner/> Loading.. </div>
            }
        </Button>
    );
};

export default ButtonSpin;