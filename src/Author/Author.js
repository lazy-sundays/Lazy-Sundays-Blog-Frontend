import React, { useEffect, useState } from "react";
import axios from "axios";
import {useParams} from "react-router-dom";

export default function Author() {
    const [authorInfo, setAuthorInfo] = useState('');
    const [numContributions, setNumContributions] = useState('');
    const {slug} = useParams();

    function authorIsLoading() {return (authorInfo === '')};
    function numContIsLoading() {return (numContributions === '')};
    function selectThirdPerson(pronouns) {

        if(pronouns.length == 0) return 'them';
        return (pronouns[Math.floor(Math.random()*pronouns.length)]).toLowerCase().trim().split("/")[1];

    };

    async function getAuthorInfo(){
        try {
            const response = await axios.get(
                
                process.env.REACT_APP_URI_ROOT+"/api/authors?filters[slug]=" + slug +"&populate[0]=avatar&populate[1]=linkTree",
                {
                    headers: {
                        Authorization: 'Bearer '+process.env.REACT_APP_STRAPI_API_KEY
                    }
                }
            );
            // console.log(response.data.data[0]);
            setAuthorInfo((response.data.data.length === 0) ? '' : response.data.data[0]);
            // return response.data;
        } catch (error) {
            // TODO: navigate to error page
            console.log(error);
        } finally {
        }       
    };

    async function getNumContributions(){

        try {
            const response = await axios.get(
                
                process.env.REACT_APP_URI_ROOT+"/api/authors/"+slug+"/articles/count",
                {
                    headers: {
                        Authorization: 'Bearer '+process.env.REACT_APP_STRAPI_API_KEY
                    }
                }
            );
            //console.log(response.data.data);
            setNumContributions(response.data.count);
            // return response.data;
        } catch (error) {
            // TODO: navigate to error page
            console.log(error);
        } finally {
        }
    };

    useEffect(() => {
        if (authorIsLoading()) getAuthorInfo();
        if (numContIsLoading()) getNumContributions();
    }, []);

    //TODO: relpace defualt loading elements
    return (
        <article id="pg-content" className="flex flex-wrap gap-y-10 px-4 pt-5 pb-10 sm:px-14 lg:px-20">
            <div className="flex flex-col grow md:max-w-[75%]">
                <h1 className="text-2xl md:text-3xl font-bold uppercase mb-5">
                    Biography
                </h1>
                <div className="flex flex-wrap mr-2 sm:mr-8 max-w-3xl">
                    <div className="w-28 sm:w-36 md:w-44 h-28 sm:h-36 md:h-44 shrink-0">
                        {authorIsLoading() ? <>Loading...</> : 
                            <img src={authorInfo.attributes.avatar.data.attributes.url}
                                className={"w-full h-full object-cover mr-4 rounded-full border-2 border-stone-500/75"}
                            />
                        }
                    </div>
                    <div className="flex w-[calc(100%-9rem)] sm:w-[calc(100%-12rem)] flex-col gap-3 ml-4">
                        <div className="font-bold text-lg">{authorIsLoading() ? <>Loading...</> : authorInfo.attributes.name}</div>
                        <div>{numContIsLoading() ? <>Loading...</> : (numContributions === 0 ) ? <></> : <span>{numContributions} article {(numContributions === 1 ) ? 'contribution' : 'contributions'}</span>}</div>
                        <div>
                            {authorIsLoading() ? <>Loading...</> : <span>Contributor since {new Date(authorInfo.attributes.createdAt).toLocaleString("en-US", {
                                day: "numeric",
                                month: "long",
                                year: "numeric"
                            })}</span>}
                        </div>
                        <div className="collapse sm:visible"> {/* bio desktop version */}
                            {authorIsLoading() ? <>Loading...</> : authorInfo.attributes.bio}
                        </div>
                    </div>
                    <div className="visible sm:collapse w-full mt-4"> {/* bio mobile version */}
                            {authorIsLoading() ? <>Loading...</> : authorInfo.attributes.bio}
                    </div>
                </div>
            </div>
            <div className="w-auto max-w-full md:max-w-[25%]">
                <h1 className="text-2xl md:text-3xl font-bold uppercase mb-5">
                    Find {authorIsLoading() ? "Them" : selectThirdPerson(authorInfo.attributes.pronouns)} At
                </h1>
                <ul className="flex flex-wrap mx-2 sm:mx-8">
                    {authorIsLoading() ? <>Loading...</> : 
                        authorInfo.attributes.linkTree.data.map((linkItem) =>
                        <li className="mb-3 break-words">
                            {linkItem.attributes.siteName}:
                            <a href={(linkItem.attributes.siteName === "Email" ? "mailto:" : "") + linkItem.attributes.link} className="mx-2 italic hover:underline hover:decoration-1-primary hover:decoration-2">
                                {linkItem.attributes.link}
                            </a>
                        </li>
                        )
                    }
                </ul>
            </div>
        </article>
    );
}