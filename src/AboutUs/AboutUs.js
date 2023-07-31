import React, { useEffect, useState } from "react";
import axios from "axios";

import ContributorPlaque from "./ContributorPlaque";

export default function AboutUs() {
    const [loadingBlurb, setLoadingBlurb] = useState(true);
    const [blurb, setBlurb] = useState("");
    const [loadingContacts, setLoadingContacts] = useState(true);
    const [contacts, setContacts] = useState([]);
    const [loadingAuthors, setLoadingAuthors] = useState(true);
    const [authors, setAuthors] = useState([]);

    useEffect(() => {
            async function getAboutUsBlurb() {
                try {
                    const response = await axios.get(
                        
                        process.env.REACT_APP_URI_ROOT+"/api/about-us?fields[0]=aboutUs",
                        {
                            headers: {
                                Authorization: 'Bearer '+process.env.REACT_APP_STRAPI_API_KEY
                            }
                        }
                    );
                    // console.log(response.data);
                    setLoadingBlurb(false);
                    setBlurb(response.data.data.attributes.aboutUs);
                    console.log(response.data.data.attributes.aboutUs);
                    // return response.data;
                } catch (error) {
                    // TODO: navigate to error page
                    console.log(error);
                }
            }

            async function getContacts() {
                try {
                    const response = await axios.get(
                        
                        process.env.REACT_APP_URI_ROOT+"/api/contact-us?fields[0]=contactInfo&populate[contactInfo][fields][0]=infoName&populate[contactInfo][fields][1]=info",
                        {
                            headers: {
                                Authorization: 'Bearer '+process.env.REACT_APP_STRAPI_API_KEY
                            }
                        }
                    );
                    console.log(response.data);
                    setLoadingContacts(false);
                    setContacts(response.data.data.attributes.contactInfo.data);
                    console.log(response.data.data.attributes.contactInfo.data);
                    // return response.data;
                } catch (error) {
                    // TODO: navigate to error page
                    console.log(error);
                }
            }

            async function getAuthors(pg = 1) {
                try {
                    const response = await axios.get(
                        
                        process.env.REACT_APP_URI_ROOT+"/api/authors?fields[0]=name&fields[1]=createdAt&populate[avatar][fields][0]=name&populate[avatar][fields][1]=formats&pagination[page]="+pg,
                        {
                            headers: {
                                Authorization: 'Bearer '+process.env.REACT_APP_STRAPI_API_KEY
                            }
                        }
                    );
                    console.log(response.data);
                    setLoadingAuthors(false);
                    setAuthors((prevData) => [...prevData, ...response.data.data]);
                    // return response.data;
                } catch (error) {
                    // TODO: navigate to error page
                    console.log(error);
                }
            }

        if (loadingBlurb) getAboutUsBlurb();
        if (loadingContacts) getContacts();
        if (loadingAuthors) getAuthors();
    }, []);
    
    return (
        <article id="pg-content" className="flex flex-wrap gap-y-10 px-4 pt-5 pb-10 sm:px-14 lg:px-20">
            <div className="grow md:max-w-[75%]">
                <h1 className="text-2xl md:text-3xl font-bold uppercase mb-5">
                    About Us
                </h1>
                <p className="mx-2 sm:mx-8 max-w-3xl">
                    {/* TODO: update placeholder with better placeholder */}
                    {loadingBlurb ? <>Loading...</> : blurb}
                </p>
            </div>
            <div className="w-auto max-w-full md:max-w-[25%]">
                <h1 className="text-2xl md:text-3xl font-bold uppercase mb-5">
                    Contact Us
                </h1>
                <ul className="mx-2 sm:mx-8">
                    {/* TODO: update placeholder with better placeholder */}
                    {loadingContacts ? <>Loading...</> :
                        contacts.map((contact) => 
                            <li className="mb-3 break-words">
                                {contact.attributes.infoName}: 
                                <a href={(contact.attributes.infoName === "Email" ? "mailto:" : "") + contact.attributes.info} className="mx-2 italic hover:underline hover:decoration-1-primary hover:decoration-2">
                                    {contact.attributes.info}
                                </a>
                            </li>
                        )
                    }
                </ul>
            </div>
            <div className="w-full"> 
                <h1 className="text-2xl md:text-3xl font-bold uppercase mb-5">
                    List of Contributors
                </h1>
                <ul className="flex flex-wrap gap-6 mx-2 sm:mx-8">
                    {loadingAuthors ? <>Loading...</> :
                    //TODO: implement pagination/scrolling
                        authors.map((author) => {
                            return (
                                <ContributorPlaque as={"li"} author={author}/>
                            );
                        })
                    }
                </ul>
            </div>
        </article>
    );
}