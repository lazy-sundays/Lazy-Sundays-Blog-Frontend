import React, { useEffect } from "react";
import axios from "axios";

export default function RandomArticle(){

    async function getRandomArticle(){
        try { const response = await axios.get(
                
                process.env.REACT_APP_URI_ROOT+"/api/random-article",
                {
                    headers: {
                        Authorization: 'Bearer '+process.env.REACT_APP_STRAPI_API_KEY
                    }
                }
            );
            // console.log(response.data.slug);
            window.location.href = "/articles/"+response.data.slug //navigate 
            // return response.data;
        } catch (error) {
            // TODO: navigate to error page
            console.log(error);
        } finally {
        }  
    }
    
    useEffect(() => {
        getRandomArticle();
    }, []);

    return (
        <article className="flex h-full w-full align-middle justify-center">
            <div>
                Loading...
            </div>
        </article>
    );
}