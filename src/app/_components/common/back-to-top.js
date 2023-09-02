"use client"
import {useState} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowUp } from '@fortawesome/free-solid-svg-icons'

export default function BackToTop(){

    const isBrowser = () => typeof window !== 'undefined'; //The approach recommended by Next.js
    
    const [visible, setVisible] = useState(false);

    const toggleVisible = () => {
        if (!isBrowser()) return;
        const scrolled = document.documentElement.scrollTop;
        if (scrolled > window.innerHeight){
          setVisible(true)
        } 
        else if (scrolled <= window.innerHeight){
          setVisible(false)
        }
      };
      
      const scrollToTop = () =>{
        if (!isBrowser()) return;
        window.scrollTo({
          top: 0, 
          behavior: 'smooth'
          /* you can also use 'auto' behaviour
             in place of 'smooth' */
        });
      };
      
      if (isBrowser()) window.addEventListener('scroll', toggleVisible);
    
    
    return (
      <div className={`${visible ? 'sticky' : "invisible"} w-full flex justify-end bottom-0 pointer-events-none`}>
        <div className={`mt-6 sm:mt-10 -translate-x-6 -translate-y-6 sm:-translate-x-10 sm:-translate-y-10`}
        >
          <button onClick={scrollToTop} className={`p-4 pointer-events-auto rounded-full bg-accentprimary text-bgsecondary hover:opacity-75`}>
            <FontAwesomeIcon className={`fa-lg fa-fw`} icon={faArrowUp} />
          </button>
        </div> 
      </div>
        
    );
}