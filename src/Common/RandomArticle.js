import React, {useEffect, useState} from "react";

export default function RandomArticle({className, displayName, hrefRootPath}){

    const [articleId, setArticleId] = useState(0);


    function getRandomInt() {
        return Math.floor((Math.random() * 100) + 1); //don't want to be zero, for testing
    };

    useEffect(() => {

        //make call to server to get random article here
         
        setArticleId(getRandomInt());

    }, []);

    return (
        <a href={hrefRootPath + articleId} className={className}>{displayName}</a>
    );
}