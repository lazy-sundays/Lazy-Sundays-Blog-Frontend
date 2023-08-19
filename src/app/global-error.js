'use client'
 
export default function GlobalError({ error, reset }) {
  return (
    <html>
      <body className="bg-bgprimary text-textprimary sunset-overlook">
        <div className='text-center'>
              <h2 className='mt-5 text-wrap text-3xl md:text-5xl lg:text-7xl'>Something broke!</h2>
              <Image 
                  src={errorGIF}
                  width={150}
                  height={150}
                  className='m-auto'
                  //TODO: add alt text
              />
              <p className='mt-5 text-lg md:text-xl lg:text-2xl'>{error.message}</p>
              <Button onClick={() => reset()} className={"mt-10"}>Try Again</Button>
          </div>
      </body>
    </html>
  )
}