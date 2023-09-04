'use client'
import Image from "next/image";
import Button from "./_components/common/button";
import errorGIF from "/public/error.gif";
 
export default function Error({ error, reset }) {

    // console.log(error);
    return (
        <div className='text-center'>
            <h2 className='mt-5 text-wrap text-3xl md:text-5xl lg:text-7xl'>Something broke!</h2>
            <Image 
                src={errorGIF}
                width={150}
                height={150}
                className='m-auto'
                alt="a disembodied arm smashing a laptop in frustration"
            />
            <p className='mt-5 text-lg md:text-xl lg:text-2xl'>{error.message}</p>
            <Button onClick={() => reset()} className={"mt-10"}>Try Again</Button>
        </div>
    )
}