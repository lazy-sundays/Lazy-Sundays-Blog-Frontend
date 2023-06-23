import React from "react";

import clive_img from "../media/temp/clive.jpg";
import jill_img from "../media/temp/jill.jpg";
import joshua_img from "../media/temp/joshua.jpg";

export default function AboutUs() {
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

    return (
        <article id="pg-content" className="flex flex-wrap gap-y-10 px-4 pt-5 pb-10 sm:px-14 lg:px-20">
            <div className="grow">
                <h1 className="text-2xl md:text-3xl font-bold uppercase mb-5">
                    About Us
                </h1>
                <p className="mx-2 sm:mx-8 max-w-3xl">
                Lorem ipsum dolor sit amet, sit no populo persequeris delicatissimi. Eum et lorem iuvaret, an utroque repudiare eum. Suscipit voluptua evertitur ne pri, te per habemus civibus. Ea mea oblique aliquid, id audiam molestie inciderint vim, commune expetenda has ex. Sed ad quodsi laoreet.

Minim delicata adipiscing sit id, ea elitr impetus delenit mea, graecis fuisset eum in. Eam ne quaeque nominavi, ad eum principes imperdiet hendrerit, doctus pertinacia mea ad. Fuisset percipit eum ut, cum at quot sonet evertitur. Ne nec veri vitae qualisque, nec propriae accumsan in, est no quot lorem adipiscing. Eu mutat causae volumus vis. Cu regione civibus vim, an nec habeo virtute blandit.
                </p>
            </div>
            <div className="w-full lg:w-3/12">
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
            <div className="w-full ">
                <h1 className="text-2xl md:text-3xl font-bold uppercase mb-5">
                    List of Contributors
                </h1>
                <ul className="flex flex-wrap gap-y-8 mx-2 sm:mx-8">
                    {authorsPlaceholderResponse.data.map((author) => {
                        return (
                            <li className="flex w-full sm:w-1/2">
                                <img src={author.attributes.avatar.url}
                                    className={"max-w-[96px] max-h-[96px] mr-4 rounded-full border-2 border-stone-500/75"}
                                />
                                <div className="w-1/2 flex flex-col justify-center">
                                    <h3 className="w-full text-xl font-semibold">
                                        {author.attributes.name}
                                    </h3>
                                    <span className="text-lg">
                                        Contributor since {author.attributes.createdAt}
                                    </span>
                                </div>
                            </li>
                        );
                    })}
                </ul>
            </div>
        </article>
    );
}