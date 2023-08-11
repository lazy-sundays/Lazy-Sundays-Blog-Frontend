import React, { useEffect, useState } from "react";
import axios from "axios";
import {useParams} from "react-router-dom";

export default function Author() {
    const [authorInfo, setAuthorInfo] = useState('');
    const [numContributions, setNumContributions] = useState('');
    const {slug} = useParams();

    const authorIsLoading = () => (authorInfo === '');
    const numContIsLoading = () => (numContributions === '');
    const selectThirdPerson = (pronouns) => {

        if((pronouns == null || pronouns.length === 0) || (pronouns.includes("any pronouns"))) return "'em";
        return (pronouns[Math.floor(Math.random()*pronouns.length)]).toLowerCase().trim().split("/")[1];

    };
    const pronounsToString = (pronouns) => {

        if(pronouns.length === 0) return "";
        if((pronouns.length === 1)) return pronouns.toString();
        if ((pronouns.includes("any pronouns"))) return "any pronouns";
        return pronouns.map((pn, i, a) => pn.toLowerCase().trim().split("/")[0]+(i === a.length-1 ? "" : "/"));

    };

    async function getAuthorInfo(){
        try {
            const response = await axios.get(
                
                process.env.REACT_APP_URI_ROOT+"/api/authors?filters[slug]="+slug+"&populate[0]=avatar&populate[1]=linkTree",
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
            console.log(error);
            window.location.href = `/error/${error.response.status}` //navigate to error page
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
            console.log(error);
            window.location.href = `/error/${error.response.status}` //navigate to error page
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
                <h1 className="text-3xl md:text-4xl font-bold uppercase mb-5">
                    Biography
                </h1>
                {(authorIsLoading() || numContIsLoading()) ? <>Loading...</> : 
                    <div className="flex flex-wrap mr-0 sm:mr-8 max-w-3xl">
                        <div className="w-28 sm:w-36 md:w-44 h-28 sm:h-36 md:h-44 shrink-0">
                            { 
                                <img src={authorInfo.attributes.avatar}
                                    className={"w-full h-full object-cover mr-4 rounded-full border-2 border-textprimary/50"}
                                />
                            }
                        </div>
                        <div className="flex w-[calc(100%-8.5rem)] sm:w-[calc(100%-12rem)] flex-col gap-1 ml-4">
                            <div className="font-bold text-xl">
                                {authorInfo.attributes.name} 
                                {(
                                    authorInfo.attributes.pronouns != null && 
                                    <span className="italic text-xs text-accentprimary ml-1">({pronounsToString(authorInfo.attributes.pronouns)})</span>
                                )}
                            </div>
                            <div className="text-sm">
                                {(numContributions === 0 ) ? <></> : <span>{numContributions} article {(numContributions === 1 ) ? 'contribution' : 'contributions'}</span>}
                            </div>
                            <div className="text-sm">
                                {<span>Contributor since {new Date(authorInfo.attributes.createdAt).toLocaleString("en-US", {
                                    day: "numeric",
                                    month: "long",
                                    year: "numeric"
                                })}</span>}
                            </div>
                            <div className="collapse sm:visible"> {/* bio desktop version */}
                                {authorInfo.attributes.bio}
                            </div>
                        </div>
                        <div className="visible sm:collapse w-full mt-4 mx-2"> {/* bio mobile version */}
                                {authorInfo.attributes.bio}
                        </div>
                    </div>
                }
            </div>
            <div className="w-auto max-w-full md:max-w-[25%]">
                <h1 className="text-3xl md:text-4xl font-bold uppercase mb-5">
                    Find {authorIsLoading() ? "Them" : selectThirdPerson(authorInfo.attributes.pronouns)} At
                </h1>
                {(authorIsLoading()) ? <>Loading...</> :
                    <ul className="flex flex-wrap mx-2 sm:mx-8">
                        {
                            authorInfo.attributes.linkTree.data.map((linkItem) =>
                            <li className="mb-3 break-words">
                                {linkItem.attributes.siteName}:
                                <a href={(linkItem.attributes.siteName === "Email" ? "mailto:" : "") + linkItem.attributes.link} className="mx-2 italic hover:underline hover:decoration-accentprimary hover:decoration-2">
                                    {linkItem.attributes.link}
                                </a>
                            </li>
                            )
                        }
                    </ul>
                }
            </div>
        </article>
    );
}