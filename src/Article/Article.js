import React, { useEffect, useState } from "react";
import axios from "axios";
import {useParams} from "react-router-dom";

export default function Article({isFeatured}) {
    const [articleInfo, setArticleInfo] = useState('');
    const {slug} = useParams();

    const articleIsLoading = () => (articleInfo === '');

    async function getArticleInfo(){
        try {
            
            const articleRequestPath = isFeatured ? "/api/featured-article?populate[article][populate]=*" : "/api/articles?filters[slug][$eqi]="+ slug +"&populate=*";
            const response = await axios.get(
            
                process.env.REACT_APP_URI_ROOT+articleRequestPath,
                {
                    headers: {
                        Authorization: 'Bearer '+process.env.REACT_APP_STRAPI_API_KEY
                    }
                }
            );
            // console.log(isFeatured ? response.data.data.attributes.article.data : response.data.data[0]);
            setArticleInfo((response.data.data.length === 0) ? '' : (isFeatured ? response.data.data.attributes.article.data : response.data.data[0]));
            // return response.data;
        } catch (error) {
            // TODO: navigate to error page
            console.log(error);
        } finally {
        }       
    };

    useEffect(() =>{

        if(articleIsLoading()) getArticleInfo();

    }, []);

    return (
        <article className="text-center">
            {articleIsLoading() ? <>Loading...</> :
                <>
                    <div className="">
                        <div className={"sm:relative"+(isFeatured ? " sm:mb-10":"")}>
                            <div className="aspect-w-16 aspect-h-6">
                                <img className="w-full h-full object-center object-cover" src={articleInfo.attributes.hero}/>
                            </div>
                            {/* TODO: fix the spacing */}
                            <div className={"sm:absolute bottom-0 pt-4 sm:pb-4"+(isFeatured ? "":" md:pb-8 lg:pb-12")+" w-full sm:px-10 md:px-24 xl:px-52 text-center sm:bg-white/50 sm:dark:bg-black/50 sm:backdrop-blur-sm"}>
                                <h2 className="text-3xl md:text-4xl mb-4 px-5 font-bold">{articleInfo.attributes.title}</h2>
                                <p className="italic px-5">{articleInfo.attributes.tagline}</p>
                                {/* Featured article info */}
                                { isFeatured && 
                                    <div className={"flex justify-center justify-items-center gap-x-10 text-center text-sm max-w-96 mx-auto mt-5 px-5"+(isFeatured ? " sm:pb-4":"")}>
                                        <span className="italic">
                                            {       
                                                (new Date(articleInfo.attributes.publishedAt)).toLocaleDateString( "en-US",
                                                    {month: 'short', day: 'numeric', year: 'numeric'})
                                            }
                                        </span>
                                        <span className="">
                                            Words by { articleInfo.attributes.authors.data.map((author, i, all) => {
                                                    return (
                                                        <>
                                                            <a href={`/authors/${author.attributes.slug}`} className="text-accentprimary hover:underline hover:decoration-accentprimary hover:decoration-2">
                                                                {author.attributes.name}
                                                            </a>{(all.length > 1 && i < all.length-1) ? ", ": ""}
                                                        </>
                                                    );
                                                })
                                            }
                                        </span>
                                        <span className="italic">
                                            ~ {Math.round(articleInfo.attributes.readTime)} min. read
                                        </span>
                                    </div>
                                }
                            </div>
                        </div>
                        {/* Regular article info */}
                        { !isFeatured && 
                            <div className="flex justify-center justify-items-center gap-x-10 text-center max-w-96 mx-auto mt-5 px-5 text-sm">
                                <span className="italic">
                                    {       
                                        (new Date(articleInfo.attributes.publishedAt)).toLocaleDateString( "en-US",
                                            {month: 'short', day: 'numeric', year: 'numeric'})
                                    }
                                </span>
                                <span className="">
                                    Words by { articleInfo.attributes.authors.data.map((author, i, all) => {
                                            return (
                                                <>
                                                    <a href={`/authors/${author.attributes.slug}`} className="text-accentprimary hover:underline hover:decoration-accentprimary hover:decoration-2">
                                                        {author.attributes.name}
                                                    </a>{(all.length > 1 && i < all.length-1) ? ", ": ""}
                                                </>
                                            );
                                        })
                                    }
                                </span>
                                <span className="italic">
                                    ~ {Math.round(articleInfo.attributes.readTime)} min. read
                                </span>
                            </div>
                        }
                    </div>
                    {!isFeatured ? <hr className="w-1/3 my-5 border-textprimary/25 m-auto" /> : <hr className="w-1/3 my-5 border-textprimary/25 m-auto sm:hidden" />}
                    <div className={"max-w-[75ch] px-5 md:px-0 mx-auto mb-10 text-justify text-lg"+(isFeatured ? " max-h-60 overflow-hidden gradient-mask-b-0" : "")}>
                        Body: {articleInfo.attributes.body}
                    </div>
                    { isFeatured &&
                        <button className="relative group w-fit p-4 sm:px-10 md:px-14 lg:px-120 m-auto rounded-md font-semibold text-lg bg-bgsecondary
                            transition ease-in delay-100 hover:ease-out group-hover:delay-200 hover:-translate-x-1 hover:-translate-y-1"
                        >
                            <a href={`/articles/${articleInfo.attributes.slug}`} aria-label={`go to article: ${articleInfo.attributes.title}`}>
                                <span className="absolute inset-0" aria-hidden/>
                                Continue Reading
                            </a>
                            <div id="rectangle" aria-hidden
                                className="-z-10 absolute w-full h-full p-2 bg-accentprimary rounded-md top-0 left-0"
                            />
                            <div id="rectangle" aria-hidden
                                className="-z-20 absolute w-full h-full p-2 bg-accentsecondary rounded-md top-0 left-0
                                    transition ease-in delay-150 group-hover:transition group-hover:ease-out group-hover:delay-150
                                    group-hover:translate-x-0.5 group-hover:translate-y-0.5"
                            />
                            <div id="rectangle" aria-hidden
                                className="-z-30 absolute w-full h-full p-2 bg-accenttertiary rounded-md top-0 left-0
                                    transition ease-in delay-200 group-hover:transition group-hover:ease-out group-hover:delay-100
                                    group-hover:translate-x-1 group-hover:translate-y-1"
                            />
                        </button>
                    }
                    
                </>
            }
        </article>
    );
}

Article.defaultProps = {
    isFeatured: false
};