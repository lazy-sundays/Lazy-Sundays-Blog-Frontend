import React from "react";

/*  Plaque for an article in a list view. 
 *  Props Structure:
 *      as: String,
 *      id: Integer,
 *      title: String,
 *      hero: { 
 *          "data": {
 *              "url": String, 
 *              "alternativeText": String,
 *          },
 *      },
 *      tagline: String,
 *      authors: {
 *          "data": [
 *              {
 *                  "id": Integer,
 *                  "avatar": {
 *                      "data": {
 *                          "url": String,
 *                          "alternativeText": String,
 *                      },
 *                  },
 *                  "name": String,
 *              },
 *          ],
 *      },
 *      createdAt: Date,
 *      readTime: Integer
 */
export default function ArticlePlaque({ as: Component, id, title, hero, tagline, authors, createdAt, readTime }) {


    return (
            <Component className="mx-2 sm:mx-8 max-w-3xl">
                <img
                    src={hero.data.url}
                    alt={hero.data.alternativeText}
                    className="sm:max-w-sm"
                />
                {/* TODO: add text shadow to title/tagline on desktop */}
                {/* TODO: reposition on desktop */}
                <h2 className="text-xl font-bold mt-4 sm:mt-0 sm:pl-6 sm:-indent-6 text-shadow-sm">
                    {title}
                </h2>
                <p className="text-sm italic">
                    {tagline}
                </p>
                <div className="flex flex-wrap mt-4 sm:mt-0 max-w-sm text-xs">
                    <span className="w-1/2">
                        By: <a href={`/authors/${authors.data[0].id}`}
                               className="hover:decoration-1-secondary hover:decoration-2 hover:underline"
                            >
                            {authors.data[0].name}
                            </a>
                    </span>
                    <span className="w-1/2 text-right">
                        {readTime} mins. to read
                    </span>
                    <span className="w-1/2">
                        {createdAt}
                    </span>
                </div>
                <a href={`/articles/${id}`} className="block">
                    <button className="w-full sm:w-fit bg-slate-900 mt-4 p-3 rounded-md">
                            Continue Reading
                    </button>
                </a>
                {/* TODO: configure button hover effect */}
                {/* <div id="rectangle" 
                    className="-z-10 w-full p-6 bg-1-primary rounded-md translate-x-2 -translate-y-2"
                /> */}
            </Component>
    );
}

let currDate = new Date();
ArticlePlaque.defaultProps = {
    as: "article",
    id: -1,
    title: "Loading Title",
    hero: {
        "data": {
            "url": "loading",
            "alternativeText": "loading image",
        },
    },
    tagline: "loading tagline",
    authors: {
        "data": [
            {
                "id": -1,
                "avatar": {
                    "data": {
                        "url": "",
                        "alternativeText": "now loading",
                    }
                },
                "name": "loading name"
            },
        ],
    },
    createdAt: currDate,
    readTime: 0,
}