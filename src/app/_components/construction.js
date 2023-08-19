import Image from "next/image";
import constructionGIF from "/public/construction.gif";
import barConstructionGIF from "/public/barraconstruction.gif";


export default function Construction(){
    return (
        <div className='text-center'>
            {/* <h2 className='mt-5 text-wrap text-3xl md:text-5xl lg:text-7xl'>This Page is Still Under Construction.</h2> */}
            <Image
                src={barConstructionGIF}
                width={800}
                height={300}
                className='m-auto'
                //TODO: add alt text
            />
            <Image 
                src={constructionGIF}
                width={150}
                height={150}
                className='m-auto'
                //TODO: add alt text
            />
            <p className='mt-10 text-lg md:text-xl lg:text-2xl'>Please Check Back in Soon</p>
        </div>
    )
}