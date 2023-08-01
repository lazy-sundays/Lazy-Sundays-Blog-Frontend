import React, { useEffect, useState } from "react";
import axios from "axios";
import {useParams} from "react-router-dom";

export default function Author() {
    const [authorInfo, setAuthorInfo] = useState('');
    const [numContributions, setNumContributions] = useState('');
    const {id} = useParams();

    function authorIsLoading() {return (authorInfo === '')};
    function numContIsLoading() {return (numContributions === '')};

    async function getAuthorInfo(){
        try {
            const response = await axios.get(
                
                process.env.REACT_APP_URI_ROOT+"/api/authors/"+id+"?fields[0]=name&fields[1]=favoriteColor&fields[3]=bio&fields[4]=createdAt&populate[0]=avatar&populate[1]=linkTree",
                {
                    headers: {
                        Authorization: 'Bearer '+process.env.REACT_APP_STRAPI_API_KEY
                    }
                }
            );
            //console.log(response.data.data);
            setAuthorInfo(response.data.data);
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
                
                process.env.REACT_APP_URI_ROOT+"/api/authors/"+id+"/articles/count",
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

    return (
        <article>
            <div>{authorIsLoading() ? <>Loading...</> : <img src={process.env.REACT_APP_URI_ROOT+authorInfo.attributes.avatar.data.attributes.formats.thumbnail.url}
                className={" max-w-[96px] max-h-[96px] mr-4 rounded-full border-2 border-stone-500/75"}/>
            }</div>
            <div>{authorIsLoading() ? <>Loading...</> : authorInfo.attributes.name}</div>
            <div>{numContIsLoading() ? <>Loading...</> : (numContributions === 0 ) ? <></> : <span>{numContributions} article {(numContributions === 1 ) ? 'contribution' : 'contributions'}</span>}</div>
            <div>
                {authorIsLoading() ? <>Loading...</> : <span>Contributor since {new Date(authorInfo.attributes.createdAt).toLocaleString("en-US", {
                    day: "numeric",
                    month: "long",
                    year: "numeric"
                })}</span>}
            </div>
            <div>{authorIsLoading() ? <>Loading...</> : authorInfo.attributes.bio}</div>
            <div>
                <ul>
                    {authorIsLoading() ? <>Loading...</> : 
                        authorInfo.attributes.linkTree.data.map((linkItem) =>
                        <li>
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