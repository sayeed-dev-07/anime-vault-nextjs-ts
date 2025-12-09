import Image from 'next/image';
import Link from 'next/link';


const NotFound = () => {
    return (
        <div className='flex items-center flex-col  justify-center gap-y-3 min-h-[80vh]'>
            <Image className='rounded-md' height='200' alt='error-img' width='200' src='/notfound.jpg'/>
            <p className='text-3xl font-semibold'>Looks Like You are lost</p>
            <Link className='underline text-lg' href='/'>HomePage</Link>
        </div>
    );
};

export default NotFound;