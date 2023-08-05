import React, { Component, useEffect, useState } from "react";
import axios from "axios";
import Article from "../Article/Article";

export default function Home() {
    const [recentArticles, setRecentArticles] = useState([]);

    function recentArticlesIsLoading() {return (recentArticles.length === 0)};

    async function getRecentArticles() {
        try {
            const response = await axios.get(
                
                process.env.REACT_APP_URI_ROOT+"/api/articles?sort[0]=publishedAt:desc&fields[0]=publishedAt&fields[1]=title&fields[2]=slug&pagination[page]=1&pagination[pageSize]=10&populate[0]=authors",
                {
                    headers: {
                        Authorization: 'Bearer '+process.env.REACT_APP_STRAPI_API_KEY
                    }
                }
            );
            // console.log(response.data.data);
            setRecentArticles(response.data.data);
            // return response.data;
        } catch (error) {
            window.location.href = `/error/${error.response.status}` //navigate to error page
            console.log(error);
        } finally{
        }
    };

    useEffect(() => {
        if (recentArticlesIsLoading) getRecentArticles();
    }, []);

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
                {recentArticlesIsLoading() ? <>Loading...</> : <ul>
                    {recentArticles.map( (article, i, all) => {
                        return (
                            <>
                            <li className={`relative group ${("py-6")} mx-2 sm:px-8 hover:bg-stone-100 hover:dark:bg-slate-700`}>
                                <span className="text-xs text-1-primary">
                                    {(new Date(article.attributes.publishedAt)).toLocaleDateString( "en-US",
                                        {month: '2-digit', day: '2-digit'}
                                    )}
                                </span>
                                <span className="ml-2 text-md font-semibold group-hover:underline group-hover:decoration-1-primary group-hover:decoration-2">
                                    {article.attributes.title}
                                </span>
                                <a href={`/articles/${article.attributes.slug}`} aria-label="go to author's bio'">
                                    <span className="absolute inset-0" aria-hidden/>
                                </a>
                            </li>
                            {(i < all.length-1) &&
                                <hr className="mx-2 dark:border-white/25 border-slate-900/25" />
                            }
                            </>
                        );
                    })}
                </ul>}
            </div>
        </article>
    );
}