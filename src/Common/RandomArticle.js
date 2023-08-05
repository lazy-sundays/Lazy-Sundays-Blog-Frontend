import React from "react";
import axios from "axios";

export default function RandomArticle({className, displayName, hrefRootPath}){

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
            window.location.href = hrefRootPath + response.data.slug //navigate 
            // return response.data;
        } catch (error) {
            // TODO: navigate to error page
            console.log(error);
        } finally {
        }  
    }

    return (
        <span className={className} onClick={getRandomArticle}>{displayName}</span>
    );
}