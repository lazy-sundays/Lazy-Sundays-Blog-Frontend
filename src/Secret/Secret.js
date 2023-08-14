import React from "react";

export default function Secret() {
    return (
        <article className="">
            <div className="m-5 text-2xl text-center">
                {"Surprise! :)"}
            </div>
            <div className="aspect-w-16 aspect-h-9 mt-5 mx-4 sm:mx-14 lg:mx-20">
                <iframe src="https://www.youtube.com/embed/3jl7-0CIENA" 
                    title="YouTube video player" 
                    frameborder="0" 
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                    allowfullscreen
                    className=""
                />
            </div>
        </article>
    );
};