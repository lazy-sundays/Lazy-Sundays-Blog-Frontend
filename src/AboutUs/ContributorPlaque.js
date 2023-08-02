import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleRight } from '@fortawesome/free-solid-svg-icons';

export default function ContributorPlaque({ as: Component, author }) {
    const createdDate = new Date(author.attributes.createdAt);

    return (
        <Component className="flex group relative w-full p-2 lg:basis-[calc(50%-1.5rem)] bg-white dark:bg-slate-800 border border-slate-700/80 rounded-md
            transition ease-in delay-100 hover:ease-out group-hover:delay-200 hover:-translate-x-1 hover:-translate-y-1"
        >
            <div className="group-hover:z-10" aria-hidden>
                <img src={process.env.REACT_APP_URI_ROOT+author.attributes.avatar.data.attributes.formats.thumbnail.url}
                    className={" max-w-24 max-h-24 mr-4 rounded-full border-2 border-stone-500/75"}
                />
            </div>
            <div className="w-1/2 flex flex-col justify-center">
                <h3 className="w-full text-xl font-semibold group-hover:animate-fancy-shadow-1">
                    {author.attributes.name}
                </h3>
                <span className="text-lg">
                    Contributor since {createdDate.toLocaleString("en-US", {
                        month: "long",
                        year: "numeric"
                    })}
                </span>
            </div>
            <div className="flex w-auto h-auto grow justify-end items-center" aria-hidden>
                <FontAwesomeIcon icon={faAngleRight} className="mr-10"/>
            </div>
            <div id="rectangle" aria-hidden
                className="-z-10 absolute w-full h-full p-2 bg-1-primary rounded-md -translate-x-2 -translate-y-2"
            />
            <div id="rectangle" aria-hidden
                className="-z-20 absolute w-full h-full p-2 bg-1-secondary rounded-md -translate-x-2 -translate-y-2
                    transition ease-in delay-150 group-hover:transition group-hover:ease-out group-hover:delay-150
                    group-hover:-translate-x-1.5 group-hover:-translate-y-1.5"
            />
            <div id="rectangle" aria-hidden
                className="-z-30 absolute w-full h-full p-2 bg-1-tertiary rounded-md -translate-x-2 -translate-y-2
                    transition ease-in delay-200 group-hover:transition group-hover:ease-out group-hover:delay-100
                    group-hover:-translate-x-1 group-hover:-translate-y-1"
            />
            <a href={`/authors/${author.id}`} aria-label="go to author's bio'">
                <span className="absolute inset-0" aria-hidden/>
            </a>
        </Component>
    );
}

ContributorPlaque.defaultProps = {
    as: "div"
};