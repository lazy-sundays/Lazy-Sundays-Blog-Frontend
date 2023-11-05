import Image from "next/image";
import starConcept from "/public/star-concept.png";
import LinkButton from "@/app/_components/common/link-button";
import { notFound } from "next/navigation";
import getDomainIcon from "@/app/_lib/get-domain-icon";
import { apiTags } from '@/app/_lib/api-tags';

export async function generateMetadata({ params }, parent) {
    //fetch data
    const authorList = await fetch(
        process.env.STRAPI_URI_ROOT+"/api/authors?filters[slug]="+params.slug+"&populate[0]=avatar&populate[1]=linkTree", 
        {
            method: "GET",
            headers: {
                "Authorization": "Bearer "+process.env.STRAPI_API_KEY,
            },
            next: {
                tags: [apiTags.author + params.slug]
            }

        }
    ).then((res) => res.json()).then((res) => res.data);
    const authorInfo = authorList[0];
    if (!authorInfo) notFound();

    // optionally access and extend (rather than replace) parent metadata
    const previousImages = (await parent).openGraph?.images || [];

    return {
        title: `${authorInfo.attributes.name}`,
        description: authorInfo.attributes.bio,
        openGraph: {
            type: 'profile',
            siteName: `the lazy sundays blog`,
            locale: 'en_US',
            title: `${authorInfo.attributes.name} — the lazy sundays blog`,
            description: authorInfo.attributes.bio,
            images: [authorInfo.attributes.avatar, ...previousImages],
        },
    }
}

export default async function Author({ params }) {
    async function getAuthorInfo() {
        const res = await fetch(
            process.env.STRAPI_URI_ROOT+"/api/authors?filters[slug]="+params.slug+"&populate[0]=avatar&populate[1]=linkTree", 
            {
                method: "GET",
                headers: {
                    "Authorization": "Bearer "+process.env.STRAPI_API_KEY,
                },
                next: {
                    tags: [apiTags.author + params.slug]
                }
            }
        );
        
        if (!res.ok) {
            // This will activate the closest `error.js` Error Boundary
            throw new Error(`Failed to fetch author data. HTTP status code: ${res.status}`);
        }
        return res.json();
    }
    async function getNumContributions() {
        const res = await fetch(
            process.env.STRAPI_URI_ROOT+"/api/authors/"+params.slug+"/articles/count", 
            {
                method: "GET",
                headers: {
                    "Authorization": "Bearer "+process.env.STRAPI_API_KEY,
                },
                next: {
                    tags: [apiTags.numContrib]
                }
            }
        );
    
        if (!res.ok) {
            // This will activate the closest `error.js` Error Boundary
            throw new Error(`Failed to fetch contributon data. HTTP status code: ${res.status}`);
        }
        return res.json();
    }
    const selectThirdPerson = (pronouns) => {

        if((pronouns == null || pronouns.length === 0) || (pronouns.includes("any pronouns"))) return "'em";
        return (pronouns[Math.floor(Math.random()*pronouns.length)]).toLowerCase().trim().split("/")[1];

    };
    const pronounsToString = (pronouns) => {

        if(pronouns.length === 0) return "";
        if((pronouns.length === 1)) return pronouns.toString();
        if ((pronouns.includes("any pronouns"))) return "any pronouns";
        return pronouns.map((pn, i, a) => pn.toLowerCase().trim().split("/")[0]+(i === a.length-1 ? "" : "/"));

    };

    const authorList = (await getAuthorInfo()).data;
    if (authorList.length === 0) notFound();
    const authorInfo = authorList[0];
    const numContributions = (await getNumContributions()).count;
    return (
        <article className="flex flex-wrap place-content-between gap-y-10">
            <div className="flex flex-col w-full md:w-auto">
                <h1 className="text-3xl md:text-4xl font-bold uppercase mb-5">
                    {authorInfo.attributes.name}
                    {(
                        authorInfo.attributes.pronouns != null && 
                        <span className="block lowercase italic text-sm text-accentprimary/75">({pronounsToString(authorInfo.attributes.pronouns)})</span>
                    )}
                </h1>
                {
                    <div className="gap-y-4 mr-0 sm:mr-8 max-w-3xl">
                        {/* author profile picture */}
                        <figure className="relative shrink-0 w-40 h-40" aria-label={`a digital portrait of ${authorInfo.attributes.name}`}>
                            <Image src={authorInfo.attributes.avatar || starConcept}
                                alt={`${authorInfo.attributes.name}'s profile picture`}
                                className={"object-cover rounded-md border-2 border-textcode bg-textcode/75"}
                                fill
                            />
                        </figure>
                        {/* author contribution stats */}
                        <div className="normal-case mt-4">
                            <span className="text-texttertiary text-sm font-mono">
                                {(numContributions > 0) && <span>{numContributions} article {(numContributions === 1 ) ? 'contribution' : 'contributions'}</span>}
                            </span>
                            <div className="text-texttertiary text-sm font-mono">
                                {<span>Contributor since {new Date(authorInfo.attributes.createdAt).toLocaleString("en-US", {
                                    day: "numeric",
                                    month: "long",
                                    year: "numeric"
                                })}</span>}
                            </div>
                        </div>
                        {/* author bio */}
                        <div className="block text-lg col-span-2 w-full mt-4 mr-2 font-sans"> 
                                {authorInfo.attributes.bio}
                        </div>
                    </div>
                }
            </div>
            <div className="w-full md:max-w-[50%] xl:max-w-[25%]">
                <h1 className="text-3xl md:text-4xl font-bold uppercase mb-5">
                    Find {selectThirdPerson(authorInfo.attributes.pronouns)} At
                </h1>
                {
                    <ul className="flex flex-col mx-auto">
                        {
                            authorInfo.attributes.linkTree.data.length === 0 ?
                            <>{`Nowhere else (yet). A lazy sundays exclusive!`}</> :
                            authorInfo.attributes.linkTree.data.map((linkItem, i) => 
                                <LinkButton 
                                    key={i}
                                    className="w-full mb-3"
                                    ariaLabel={`go to ${linkItem.attributes.siteName}`}
                                    href={linkItem.attributes.link}
                                >
                                    {getDomainIcon(linkItem.attributes.link)}
                                    {linkItem.attributes.siteName}
                                </LinkButton>
                            )
                        }
                    </ul>
                }
            </div>
        </article>
    );
}