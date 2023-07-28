import React, { useEffect, useState } from "react";
import axios from "axios";

import clive_img from "../media/temp/clive.jpg";
import jill_img from "../media/temp/jill.jpg";
import joshua_img from "../media/temp/joshua.jpg";
import ContributorPlaque from "./ContributorPlaque";

export default function AboutUs() {
    const [loading, setLoading] = useState(true);
    const [blurb, setBlurb] = useState("");

    const example_date = new Date().toLocaleDateString("en-US", {
        day: "numeric",
        month: "long",
        year: "numeric"
    });
    const authorsPlaceholderResponse = {
        "data": [
            {
                "id": 1,
                "attributes": {
                    "name": "Clive Rosfield",
                    "avatar": {
                        "url": clive_img, 
                        "alternativeText": "string",
                    },
                    "favoriteColor": "#000000",
                    "createdAt": example_date,
                },
                "meta": {
                    "availableLocales": []
                }
            },
            {
                "id": 2,
                "attributes": {
                    "name": "Jill Warrick",
                    "avatar": {
                        "url": jill_img,
                        "alternativeText": "string",  
                    },
                    "createdAt": example_date,
                    "favoriteColor": "#D8BFF6",
                },
                "meta": {
                    "availableLocales": []
                }
            },
            {
                "id": 3,
                "attributes": {
                    "name": "Joshua Rosfield",
                    "avatar": {
                        "url": joshua_img,
                        "alternativeText": "string",
                    },
                    "createdAt": example_date,
                    "favoriteColor": "#F7914D",
                },
                "meta": {
                    "availableLocales": []
                }
            },
        ],
        "meta": {}
    };

    async function getAboutUsBlurb() {
        try {
            const response = await axios.get(
                // TODO: move api root to environment variable
                "https://lazy-sundays-blog-backend-production.up.railway.app/api/about-us?fields[0]=aboutUs",
                {
                    headers: {
                        Authorization: 'Bearer '+process.env.REACT_APP_STRAPI_API_KEY
                    }
                }
            );
            // console.log(response.data);
            setLoading(false);
            setBlurb(response.data.data.attributes.aboutUs);
            // return response.data;
        } catch (error) {
            // TODO: navigate to error page
            console.log(error);
        }
    }

    useEffect(() => {
        getAboutUsBlurb();
    });
    
    return (
        <article id="pg-content" className="flex flex-wrap gap-y-10 px-4 pt-5 pb-10 sm:px-14 lg:px-20">
            <div className="grow">
                <h1 className="text-2xl md:text-3xl font-bold uppercase mb-5">
                    About Us
                </h1>
                <p className="mx-2 sm:mx-8 max-w-3xl">
                    {/* TODO: update placeholder with better placeholder */}
                    {loading ? <>Loading...</> : blurb}
                </p>
            </div>
            <div className="w-auto">
                <h1 className="text-2xl md:text-3xl font-bold uppercase mb-5">
                    Contact Us
                </h1>
                <ul className="mx-2 sm:mx-8">
                    <li>
                        Email: 
                        <a href="mailto:example@lazy-sundays.com" className="mx-2">
                            example@lazy-sundays.com
                        </a>
                    </li>
                </ul>
            </div>
            <div className="w-full"> 
                <h1 className="text-2xl md:text-3xl font-bold uppercase mb-5">
                    List of Contributors
                </h1>
                <ul className="flex flex-wrap gap-6 mx-2 sm:mx-8">
                    {authorsPlaceholderResponse.data.map((author) => {
                        return (
                            <ContributorPlaque as={"li"} author={author}/>
                        );
                    })}
                </ul>
            </div>
        </article>
    );
}