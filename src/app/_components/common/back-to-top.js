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
        if (scrolled > 300){
          setVisible(true)
        } 
        else if (scrolled <= 300){
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
        <div className={`${visible ? 'opacity-1 visible' : "opacity-0 collapse"} sticky md:max-w-[95ch] m-auto flex justify-end pr-5 bottom-0 pb-5  transition-[opacity] delay-200 ease-in-out`}>
            <button className={'w-12 h-12 rounded-full bg-accentprimary text-bgsecondary'} onClick={scrollToTop} >
                <FontAwesomeIcon className={"w-1/3 h-1/3"} icon={faArrowUp}/>
            </button>
        </div>
    );
}