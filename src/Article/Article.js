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
        <article>
            {articleIsLoading() ? <>Loading...</> :
                <>
                    <div className="">
                        <div className="sm:relative">
                            <div className="aspect-w-16 aspect-h-6">
                                <img className="w-full h-full object-center object-cover" src={articleInfo.attributes.hero}/>
                            </div>
                            {/* TODO: fix the spacing */}
                            <div className="sm:absolute bottom-0 pt-4 sm:pb-4 md:pb-8 lg:pb-12 w-full sm:px-10 md:px-24 xl:px-52 text-center sm:bg-white/50 sm:dark:bg-black/50 sm:backdrop-blur-sm">
                                <h2 className="text-3xl md:text-4xl mb-4 px-5 font-bold">{articleInfo.attributes.title}</h2>
                                <p className="italic px-5">{articleInfo.attributes.tagline}</p>
                            </div>
                        </div>
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
                                                <a href={`/authors/${author.attributes.slug}`} className="text-1-primary hover:underline hover:decoration-1-primary hover:decoration-2">
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
                    </div>
                    <hr className="w-1/3 my-5 dark:border-white/25 border-slate-900/25 m-auto" />
                    <div className="max-w-[75ch] px-5 sm:px-0 mx-auto text-justify text-lg">Body: {articleInfo.attributes.body}</div>
                </>
            }
        </article>
    );
}

Article.defaultProps = {
    isFeatured: false
};