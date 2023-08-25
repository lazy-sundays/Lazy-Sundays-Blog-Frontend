"use client"

import {useState} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowUp } from '@fortawesome/free-solid-svg-icons'
import Button from './button';

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
      <div className='sticky w-full flex justify-end bottom-0'>
        <div className={`${visible ? 'opacity-1 visible' : "opacity-0 invisible"} transition-[opacity] ease-in-out mr-3 md:mr-10 mt-3 md:mt-0 mb-3 md:mb-10`}
        >
          <button onClick={scrollToTop} className={`p-4 rounded-full bg-bgsecondary hover:bg-accentprimary hover:text-bgsecondary`}>
            <FontAwesomeIcon className={`fa-lg fa-fw`} icon={faArrowUp} />
          </button>
        </div> 
      </div>
        
    );
}