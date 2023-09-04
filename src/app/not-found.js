import Image from 'next/image';
import LinkButton from './_components/common/link-button';
import dunno from '/public/dunno.gif';

export default function NotFound() {
  return (
    <div className='text-center'>
        <h2 className='mt-5 text-wrap text-3xl md:text-5xl lg:text-7xl'>404: Not Found</h2>
        <Image 
            src={dunno}
            width={100}
            height={100}
            className='m-auto'
            alt='a round yellow emoji guy shrugging his shoulders in confusion'
        />
        <p className='mt-5 text-lg md:text-xl lg:text-2xl'>Could not find requested resource. Are you sure the address is correct?</p>
        <LinkButton href="/" className={"mt-10"}>Return Home</LinkButton>
    </div>
  )
}