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
                    className="max-w-sm"
                />
                <h2 className="">
                    {title}
                </h2>
                <p className="">
                    {tagline}
                </p>
                <div className="flex flex-wrap max-w-sm">
                    <span className="w-1/2">
                        By: {authors.data[0].name}
                    </span>
                    <span className="w-1/2">
                        {readTime} mins. to read
                    </span>
                    <span className="w-1/2">
                        {createdAt}
                    </span>
                </div>
                <button className="bg-2-primary text-slate-900">
                    <a href={`/articles/${id}`}>
                        Continue Reading
                    </a>
                </button>
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