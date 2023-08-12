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
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                console.log(error.response.data);
                console.log(error.response.status);
                console.log(error.response.headers);
                window.location.href = `/error/${error.response.status}` //navigate to error page
            } else if (error.request) {
                // The request was made but no response was received
                // `error.request` is an instance of XMLHttpRequest in the browser 
                // and an instance of http.ClientRequest in node.js
                console.log(error.request);
            } else {
                // Something happened in setting up the request that triggered an Error
                console.log('Error', error.message);
            }
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