"use client"
import React from "react";
import Image from "next/image";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleRight } from '@fortawesome/free-solid-svg-icons';
import starConcept from "/public/star-concept.png";
import LinkButton from "../common/link-button";

export default function ContributorPlaque({author }) {
    const createdDate = new Date(author.attributes.createdAt);

    return (
        <LinkButton 
            as="li"
            href={`/authors/${author.attributes.slug}`}
            ariaLabel={`go to ${author.attributes.name}'s page`}
            className="grow w-full"
            useAltColorScheme
        >
            <div className="flex">
                <div className="collapse mr-4 2xs:visible group-hover:z-10" aria-hidden>
                    <Image 
                        src={author.attributes.avatar || starConcept}
                        alt={`author image`}
                        width={96}
                        height={96}
                        className={"aspect-square rounded-full border-2 border-slate-400 dark:border-slate-500"}
                    />
                </div>
                <div className="grow self-center text-left">
                    <h3 className="w-full text-xl font-bold">
                        {author.attributes.name}
                    </h3>
                    <span className="text-lg">
                        Contributor since {createdDate.toLocaleString("en-US", {
                            month: "long",
                            year: "numeric"
                        })}
                    </span>
                </div>
                <div className="flex grow justify-end self-center mr-4" aria-hidden>
                    <FontAwesomeIcon icon={faAngleRight} className="group-hover:transition-none transition-[visibility] delay-200 ease-linear"/>
                </div>
            </div>
        </LinkButton>
    );
}