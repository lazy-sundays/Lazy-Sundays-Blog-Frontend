import React, { useEffect, useState } from "react";
import axios from "axios";
import ContributorPlaque from "./ContributorPlaque";

export default function AboutUs() {
    const [blurb, setBlurb] = useState("");
    const [contacts, setContacts] = useState([]);
    const [loadingAuthors, setLoadingAuthors] = useState(false);
    const [authors, setAuthors] = useState([]);
    const [authorPageNum, setAuthorPageNum] = useState(1);
    const [moreAuthors, setMoreAuthors] = useState(false);

    function blurbIsLoading() {return (blurb === "")};
    function contactsAreLoading() {return (contacts.length === 0)};
    function authorsAreLoading() {return (authors.length === 0)};

    let authorPageTotal = 1;

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
            setBlurb(response.data.data.attributes.aboutUs);
            // return response.data;
        } catch (error) {
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                console.log(error.response.data);
                console.log(error.response.status);
                console.log(error.response.headers);
                window.location.href = `/error/${error.response.status}` //navigate to error page
            } else if (error.request) {
                // The request was made but no response was received
                // `error.request` is an instance of XMLHttpRequest in the browser 
                // and an instance of http.ClientRequest in node.js
                console.log(error.request);
            } else {
                // Something happened in setting up the request that triggered an Error
                console.log('Error', error.message);
            }
        } finally{

        }
    };

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
            // console.log(response.data);
            setContacts(response.data.data.attributes.contactInfo.data);
            // return response.data;
        } catch (error) {
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                console.log(error.response.data);
                console.log(error.response.status);
                console.log(error.response.headers);
                window.location.href = `/error/${error.response.status}` //navigate to error page
            } else if (error.request) {
                // The request was made but no response was received
                // `error.request` is an instance of XMLHttpRequest in the browser 
                // and an instance of http.ClientRequest in node.js
                console.log(error.request);
            } else {
                // Something happened in setting up the request that triggered an Error
                console.log('Error', error.message);
            }
        } finally{

        }
    };

    async function getAuthors() {
        setLoadingAuthors(true);
        try {
            const response = await axios.get(
                
                process.env.REACT_APP_URI_ROOT+"/api/authors?pagination[page]="+authorPageNum+"&pagination[pageSize]=4",
                {
                    headers: {
                        Authorization: 'Bearer '+process.env.REACT_APP_STRAPI_API_KEY
                    }
                }
            );
            // console.log(response.data);
            setAuthors((prevData) => [...prevData, ...response.data.data]);
            setAuthorPageNum(response.data.meta.pagination.page + 1);
            authorPageTotal=response.data.meta.pagination.pageCount;
            setMoreAuthors(response.data.meta.pagination.page < response.data.meta.pagination.pageCount);
            // return response.data;
        } catch (error) {
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                console.log(error.response.data);
                console.log(error.response.status);
                console.log(error.response.headers);
                window.location.href = `/error/${error.response.status}` //navigate to error page
            } else if (error.request) {
                // The request was made but no response was received
                // `error.request` is an instance of XMLHttpRequest in the browser 
                // and an instance of http.ClientRequest in node.js
                console.log(error.request);
            } else {
                // Something happened in setting up the request that triggered an Error
                console.log('Error', error.message);
            }
        } finally{
            setLoadingAuthors(false);
        }
    };

    useEffect(() => {
        if (blurbIsLoading()) getAboutUsBlurb();
        if (contactsAreLoading()) getContacts();
        if (authorsAreLoading() && !loadingAuthors) getAuthors();
    }, []);
    
    return (
        <article id="pg-content" className="flex flex-wrap gap-y-10 px-4 pt-5 pb-10 sm:px-14 lg:px-20">
            <div className="grow md:max-w-[75%]">
                <h1 className="text-3xl md:text-4xl font-bold uppercase mb-5">
                    About Us
                </h1>
                <p className="mx-2 sm:mx-8 max-w-3xl">
                    {/* TODO: update placeholder with better placeholder */}
                    {blurbIsLoading() ? <>Loading...</> : blurb}
                </p>
            </div>
            <div className="w-auto max-w-full md:max-w-[25%]">
                <h1 className="text-3xl md:text-4xl font-bold uppercase mb-5">
                    Contact Us
                </h1>
                <ul className="mx-2 sm:mx-8">
                    {/* TODO: update placeholder with better placeholder */}
                    {contactsAreLoading() ? <>Loading...</> :
                        contacts.map((contact) => 
                            <li className="mb-3 break-words">
                                {contact.attributes.infoName}: 
                                <a href={(contact.attributes.infoName.trim().toLowerCase() === "email" ? "mailto:" : "") + contact.attributes.info} className="mx-2 italic hover:underline hover:decoration-accentprimary hover:decoration-2">
                                    {contact.attributes.info}
                                </a>
                            </li>
                        )
                    }
                </ul>
            </div>
            <div className="w-full"> 
                <h1 className="text-3xl md:text-4xl font-bold uppercase mb-5">
                    List of Contributors
                </h1>
                <ul className="flex flex-wrap gap-6 mx-2 sm:mx-8">
                    {authors.map((author) => {
                        return (
                            <ContributorPlaque as={"li"} author={author}/>
                        );
                    })}
                    {authorsAreLoading() && <>Loading...</>}
                </ul>
            </div>
            <div>
                {(moreAuthors) ? <button onClick={() => {getAuthors()}} >More</button> : <></>}
            </div>
        </article>
    );
}