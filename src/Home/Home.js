import React, { Component } from "react";
import ArticlePlaque from "../Article/ArticlePlaque";
import Article from "../Article/Article";

export default function Home() {
    const example_date = new Date().toLocaleDateString("en-US", {
        day: "numeric",
        month: "long",
        year: "numeric"
    });
    const featuredArticlePlaceholderResponse = {
        "data": {
                "id": 16,
                "attributes": {
                    "title": "This Leather Glove Looks So Good",
                    "hero": {
                        "data": {
                            "url": "https://media.discordapp.net/attachments/201724822877634560/1124420347471605830/1890dc2f17b64-screenshotUrl.jpg", 
                            "alternativeText": "A hand wearing a leather glove rested in a fist on a wooden table",
                        },
                    },
                    "tagline": "This leather glove from Final Fantasy XVI looks incredible -- here's a breakdown.",
                    "authors": {
                        "data": [
                            {
                                "id": 16,
                                "avatar": {
                                    "data": {
                                        "url": "https://cdnen.samurai-gamers.com/wp-content/uploads/2023/06/14093419/Final-Fantasy-XVI-FF16-Clive-Rosfield-Young-150x150.jpg",
                                        "alternativeText": "string",
                                    },
                                },
                                "name": "Clive Rosfield",
                            },
                        ],
                    },
                    "createdAt": example_date,
                    "tags": {
                        "data": [
                            {
                                "id": 0,
                                "attributes": {
                                    "tag": "example",
                                },
                            }
                        ],
                    },
                    "readTime": 999,
                },
                "meta": {
                    "availableLocales": []
                }
        },
        "meta": {}
    };

    const recentArticlesPlaceholderResponse = [
        "This Leather Glove Looks So Good",
        "Let's Save the World Using the Power of Friendship",
        "Man Eats Food Really Fast, Gets Into Bar Fight"
    ];

    return (
        <article id="pg-content" className="flex flex-wrap gap-y-10 px-4 pt-5 pb-10 sm:px-14 lg:px-20">
            <div id="featured-article" className="grow">
                <h1 className="text-2xl md:text-3xl font-bold uppercase mb-5">
                    Featured Article
                </h1>
                {/* <ArticlePlaque 
                    id={featuredArticlePlaceholderResponse.data.id}
                    title={featuredArticlePlaceholderResponse.data.attributes.title}
                    hero={featuredArticlePlaceholderResponse.data.attributes.hero}
                    tagline={featuredArticlePlaceholderResponse.data.attributes.tagline}
                    authors={featuredArticlePlaceholderResponse.data.attributes.authors}
                    createdAt={featuredArticlePlaceholderResponse.data.attributes.createdAt}
                    readTime={featuredArticlePlaceholderResponse.data.attributes.readTime}
                /> */}
                <Article />
            </div>
            <div id="recent-articles" className="q-auto max-w-sm">
                <h1 className="text-2xl md:text-3xl font-bold uppercase mb-5">
                    Most Recent Articles
                </h1>
                <ul>
                    {recentArticlesPlaceholderResponse.map( (name, i) => {
                        return (
                            <>
                            <li className={`relative group ${(i === 0 ? "pb-6" : "py-6")} px-2 sm:px-8`}>
                                <span className="text-xs text-1-primary">
                                    {(new Date()).toLocaleDateString( "en-US",
                                        {month: '2-digit', day: '2-digit'}
                                    )}
                                </span>
                                <span className="ml-2 text-md font-semibold group-hover:underline group-hover:decoration-1-primary group-hover:decoration-2">
                                    {name}
                                </span>
                                <a href={`/articles/${name}`} aria-label="go to author's bio'">
                                    <span className="absolute inset-0" aria-hidden/>
                                </a>
                            </li>
                            { (i+1 < recentArticlesPlaceholderResponse.length) &&
                                <hr className="mx-2 dark:border-white/25 border-slate-900/25" />
                            }
                            </>
                        );
                    })}
                </ul>
            </div>
        </article>
    );
}