import Image from "next/image";
import sunConcept from "/public/sun-concept.png";
import LinkButton from "@/app/_components/common/link-button";

export async function generateMetadata({ params }, parent) {
    //fetch data
    const authorList = await fetch(
        process.env.STRAPI_URI_ROOT+"/api/authors?filters[slug]="+params.slug+"&populate[0]=avatar&populate[1]=linkTree", 
        {
            method: "GET",
            headers: {
                "Authorization": "Bearer "+process.env.STRAPI_API_KEY,
            },
        }
    ).then((res) => res.json()).then((res) => res.data);
    const authorInfo = authorList[0];

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
    if (authorList.length === 0) throw new Error("No matching author found");
    const authorInfo = authorList[0];
    const numContributions = (await getNumContributions()).count;
    return (
        <article id="pg-content" className="flex flex-wrap gap-y-10">
            <div className="flex flex-col grow md:max-w-[75%]">
                <h1 className="text-3xl md:text-4xl font-bold uppercase mb-5">
                    Biography
                </h1>
                {
                    <div className="flex flex-wrap mr-0 sm:mr-8 max-w-3xl">
                        <div className="relative aspect-square grow ">
                            { 
                                <Image src={authorInfo.attributes.avatar || sunConcept}
                                    className={"object-cover rounded-full mr-4 border-2 border-textprimary/50"}
                                    fill
                                />
                            }
                        </div>
                        <div className="flex w-[calc(100%-8.5rem)] sm:w-[calc(100%-12rem)] flex-col gap-1 ml-4">
                            <div className="font-bold text-xl font-logo">
                                {authorInfo.attributes.name} 
                                {(
                                    authorInfo.attributes.pronouns != null && 
                                    <span className="italic text-xs text-accentprimary ml-1">({pronounsToString(authorInfo.attributes.pronouns)})</span>
                                )}
                            </div>
                            <div className="text-sm font-mono">
                                {(numContributions === 0 ) ? <></> : <span>{numContributions} article {(numContributions === 1 ) ? 'contribution' : 'contributions'}</span>}
                            </div>
                            <div className="text-sm font-mono">
                                {<span>Contributor since {new Date(authorInfo.attributes.createdAt).toLocaleString("en-US", {
                                    day: "numeric",
                                    month: "long",
                                    year: "numeric"
                                })}</span>}
                            </div>
                            <div className="collapse sm:visible font-sans"> {/* bio desktop version */}
                                {authorInfo.attributes.bio}
                            </div>
                        </div>
                        <div className="visible sm:collapse w-full mt-4 mx-2 font-sans"> {/* bio mobile version */}
                                {authorInfo.attributes.bio}
                        </div>
                    </div>
                }
            </div>
            <div className="w-full md:max-w-[25%]">
                <h1 className="text-3xl md:text-4xl font-bold uppercase mb-5">
                    Find {selectThirdPerson(authorInfo.attributes.pronouns)} At
                </h1>
                {
                    <ul className="flex flex-col">
                        {
                            authorInfo.attributes.linkTree.data.map((linkItem, i) => 
                                <LinkButton 
                                    key={i}
                                    className="w-full mb-3"
                                    ariaLabel={`go to ${linkItem.attributes.siteName}`}
                                    href={((linkItem.attributes.siteName.trim().toLowerCase()) === "email" ? "mailto:" : "") + linkItem.attributes.link}
                                >
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