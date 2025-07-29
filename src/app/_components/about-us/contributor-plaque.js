"use client";
import React from "react";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons";
import starConcept from "/public/star-concept.png";
import LinkButton from "../common/link-button";

export default function ContributorPlaque({ author }) {
  const createdDate = new Date(author.createdAt);

  return (
    <LinkButton
      as="li"
      href={`/authors/${author.slug}`}
      ariaLabel={`go to ${author.name}'s page`}
      className="grow w-full"
      useAltColorScheme
    >
      <div className="flex">
        <div className="collapse mr-4 2xs:visible group-hover:z-10" aria-hidden>
          <Image
            src={author.avatar || starConcept}
            alt={`${author.name}'s profile picture`}
            width={96}
            height={96}
            className={
              "aspect-square rounded-md border-2 border-textcode bg-textcode/75"
            }
          />
        </div>
        <div className="grow self-center text-left">
          <h3 className="w-full text-xl font-bold">{author.name}</h3>
          <span className="text-lg font-normal">
            Contributor since{" "}
            {createdDate.toLocaleString("en-US", {
              month: "long",
              year: "numeric",
            })}
          </span>
        </div>
        <div className="flex grow justify-end self-center mr-4" aria-hidden>
          <FontAwesomeIcon
            icon={faAngleRight}
            className="group-hover:transition-none transition-[visibility] delay-200 ease-linear"
          />
        </div>
      </div>
    </LinkButton>
  );
}
