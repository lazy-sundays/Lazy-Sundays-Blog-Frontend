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
                <div>
                    <div>
                        <img src={articleInfo.attributes.hero.data.attributes.url}/>
                    </div>
                    <div>Title: {articleInfo.attributes.title}</div>
                    <div>Tagline: {articleInfo.attributes.tagline}</div>
                    <div>
                        {       
                            "Date: " + (new Date(articleInfo.attributes.publishedAt)).toLocaleDateString( "en-US",
                                {month: '2-digit', day: '2-digit', year: '2-digit'})
                        }
                    </div>
                    <div>
                        Authors:
                    </div>
                    <div>
                        {
                            articleInfo.attributes.authors.data.map((author) => {
                                return (
                                    <div>
                                        <a href={`/authors/${author.attributes.slug}`}>{author.attributes.name}</a>
                                    </div>
                                );
                            })
                        }
                    </div>
                    <div>ReadTime: About {articleInfo.attributes.readTime} minutes.</div>
                    <div>Body: {articleInfo.attributes.body}</div>
                </div>
            }
        </article>
    );
}

Article.defaultProps = {
    isFeatured: false
};