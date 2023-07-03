import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from "react-router-dom";

export default function ContributorPlaque({ as: Component, author }) {
    // TODO: handle onClick to navigate to author page
    // const navigate = useNavigate();

    // const handleClick = () => {
    //     navigate(`/authors/${author.id}`);
    // };

    return (
        <Component className="flex group relative w-full p-2 lg:basis-[calc(50%-1.5rem)] bg-white dark:bg-slate-800 border border-slate-700/80 rounded-md
            transition ease-in delay-100 hover:ease-out group-hover:delay-200 hover:-translate-x-1 hover:-translate-y-1" 
           // onClick={handleClick}
        >
            <div className="group-hover:z-10">
                <img src={author.attributes.avatar.url}
                    className={" max-w-[96px] max-h-[96px] mr-4 rounded-full border-2 border-stone-500/75"}
                />
            </div>
            <div className="w-1/2 flex flex-col justify-center">
                <h3 className="w-full text-xl font-semibold group-hover:animate-fancy-shadow-1">
                    {author.attributes.name}
                </h3>
                <span className="text-lg">
                    Contributor since {author.attributes.createdAt}
                </span>
            </div>
            <div className="flex w-auto h-auto grow justify-end items-center">
                <FontAwesomeIcon icon={faAngleRight} className="mr-10"/>
            </div>
            <div id="rectangle" 
                className="-z-10 absolute w-full h-full p-2 bg-1-primary rounded-md -translate-x-2 -translate-y-2"
            />
            <div id="rectangle" 
                className="-z-20 absolute w-full h-full p-2 bg-1-secondary rounded-md -translate-x-2 -translate-y-2
                    transition ease-in delay-150 group-hover:transition group-hover:ease-out group-hover:delay-150
                    group-hover:-translate-x-1.5 group-hover:-translate-y-1.5"
            />
            <div id="rectangle" 
                className="-z-30 absolute w-full h-full p-2 bg-1-tertiary rounded-md -translate-x-2 -translate-y-2
                    transition ease-in delay-200 group-hover:transition group-hover:ease-out group-hover:delay-100
                    group-hover:-translate-x-1 group-hover:-translate-y-1"
            />
        </Component>
    );
}

ContributorPlaque.defaultProps = {
    as: "div"
};