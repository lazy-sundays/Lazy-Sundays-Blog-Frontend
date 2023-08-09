import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleRight } from '@fortawesome/free-solid-svg-icons';

export default function ContributorPlaque({ as: Component, author }) {
    const createdDate = new Date(author.attributes.createdAt);

    return (
        <Component className="flex group relative w-full p-2 lg:basis-[calc(50%-1.5rem)] bg-bgsecondary border border-bgsecondary/80 rounded-md
            transition-transform ease-in delay-100 hover:ease-out group-hover:delay-200 hover:-translate-x-1 hover:-translate-y-1 hover:text-bgprimary"
        >
            <div className="group-hover:z-10" aria-hidden>
                <img src={author.attributes.avatar}
                    className={" max-w-24 max-h-24 mr-4 rounded-full border-2 border-textprimary/25"}
                />
            </div>
            <div className="w-1/2 flex flex-col justify-center group-hover:transition-none transition-colors delay-200 ease-linear">
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
                className="-z-10 absolute w-full h-full p-2 bg-accentprimary rounded-md -translate-x-2 -translate-y-2"
            />
            <div id="rectangle" aria-hidden
                className="-z-20 absolute w-full h-full p-2 bg-accentsecondary rounded-md -translate-x-2 -translate-y-2
                    transition ease-in delay-150 group-hover:transition group-hover:ease-out group-hover:delay-150
                    group-hover:-translate-x-1.5 group-hover:-translate-y-1.5"
            />
            <div id="rectangle" aria-hidden
                className="-z-30 absolute w-full h-full p-2 bg-accenttertiary rounded-md -translate-x-2 -translate-y-2
                    transition ease-in delay-200 group-hover:transition group-hover:ease-out group-hover:delay-100
                    group-hover:-translate-x-1 group-hover:-translate-y-1"
            />
            <a href={`/authors/${author.attributes.slug}`} aria-label="go to author's bio'">
                <span className="absolute inset-0" aria-hidden/>
            </a>
        </Component>
    );
}

ContributorPlaque.defaultProps = {
    as: "div"
};