import Image from "next/image";
import constructionGIF from "/public/construction.gif";
import barConstructionGIF from "/public/barraconstruction.gif";


export default function Construction(){
    return (
        <div className='text-center'>
            <Image
                src={barConstructionGIF}
                width={800}
                height={300}
                className='m-auto'
                alt="a banner of construction tape with the label 'under construction'"
            />
            <Image 
                src={constructionGIF}
                width={150}
                height={150}
                className='m-auto'
                alt="a construction worker digging"
            />
            <p className='mt-10 text-lg md:text-xl lg:text-2xl'>Please check back in soon! &#128034;</p>
        </div>
    )
}