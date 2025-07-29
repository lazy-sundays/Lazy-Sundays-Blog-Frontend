import Image from "next/image";
import starConcept from "/public/star-concept.png";
import LinkButton from "@/app/_components/common/link-button";
import { notFound } from "next/navigation";
import getDomainIcon from "@/app/_lib/get-domain-icon";
import { apiTags } from "@/app/_lib/api-tags";

export async function generateMetadata(props, parent) {
  const params = await props.params;
  //fetch data
  const authorList = await fetch(
    process.env.STRAPI_URI_ROOT +
      "/api/authors?filters[slug][$eqi]=" +
      params.slug +
      "&fields=avatar&populate=linkTree",
    {
      method: "GET",
      headers: {
        Authorization: "Bearer " + process.env.STRAPI_API_KEY,
      },
      next: {
        tags: [apiTags.author + params.slug],
      },
    }
  )
    .then((res) => res.json())
    .then((res) => res.data);

  const authorInfo = authorList[0];
  if (!authorInfo) notFound();

  // optionally access and extend (rather than replace) parent metadata
  const previousImages = (await parent).openGraph?.images || [];

  return {
    title: `${authorInfo.name}`,
    description: authorInfo.bio,
    openGraph: {
      type: "profile",
      siteName: `the lazy sundays blog`,
      locale: "en_US",
      title: `${authorInfo.name} — the lazy sundays blog`,
      description: authorInfo.bio,
      images: [authorInfo.avatar, ...previousImages],
    },
  };
}

export default async function Author(props) {
  const params = await props.params;
  async function getAuthorInfo() {
    const res = await fetch(
      process.env.STRAPI_URI_ROOT +
        "/api/authors?filters[slug][$eqi]=" +
        params.slug +
        "&g&populate=linkTree",
      {
        method: "GET",
        headers: {
          Authorization: "Bearer " + process.env.STRAPI_API_KEY,
        },
        next: {
          tags: [apiTags.author + params.slug],
        },
      }
    );

    if (!res.ok) {
      // This will activate the closest `error.js` Error Boundary
      throw new Error(
        `Failed to fetch author data. HTTP status code: ${res.status}`
      );
    }
    return res.json();
  }
  async function getAuthorLinkTree() {
    const res = await fetch(
      process.env.STRAPI_URI_ROOT +
        "/api/link-trees?populate=author&filters[author][slug][$eq]=" +
        params.slug +
        "&sort=id",
      {
        method: "GET",
        headers: {
          Authorization: "Bearer " + process.env.STRAPI_API_KEY,
        },
        next: {
          tags: [apiTags.linkTree + params.slug],
        },
      }
    );

    if (!res.ok) {
      // This will activate the closest `error.js` Error Boundary
      throw new Error(
        `Failed to fetch author data. HTTP status code: ${res.status}`
      );
    }
    return res.json();
  }
  async function getNumContributions() {
    const res = await fetch(
      process.env.STRAPI_URI_ROOT +
        "/api/authors/" +
        params.slug +
        "/articles/count",
      {
        method: "GET",
        headers: {
          Authorization: "Bearer " + process.env.STRAPI_API_KEY,
        },
        next: {
          tags: [apiTags.numContrib],
        },
      }
    );

    if (!res.ok) {
      // This will activate the closest `error.js` Error Boundary
      throw new Error(
        `Failed to fetch contributon data. HTTP status code: ${res.status}`
      );
    }
    return res.json();
  }
  const selectThirdPerson = (pronouns) => {
    if (
      pronouns == null ||
      pronouns.length === 0 ||
      pronouns.includes("any pronouns")
    )
      return "'em";
    return pronouns[Math.floor(Math.random() * pronouns.length)]
      .toLowerCase()
      .trim()
      .split("/")[1];
  };
  const pronounsToString = (pronouns) => {
    if (pronouns.length === 0) return "";
    if (pronouns.length === 1) return pronouns.toString();
    if (pronouns.includes("any pronouns")) return "any pronouns";
    return pronouns.map(
      (pn, i, a) =>
        pn.toLowerCase().trim().split("/")[0] + (i === a.length - 1 ? "" : "/")
    );
  };

  const authorList = (await getAuthorInfo()).data;
  if (authorList.length === 0) notFound();
  const authorInfo = authorList[0];
  const authorLinkTree = (await getAuthorLinkTree()).data;
  const numContributions = (await getNumContributions()).count;
  return (
    <article className="flex flex-wrap place-content-between gap-y-10">
      <section className="flex flex-col w-full md:w-auto md:pr-8">
        <h1 className="text-3xl md:text-4xl font-bold uppercase mb-5">
          {authorInfo.name}
          {authorInfo.pronouns != null && (
            <span className="block lowercase italic text-sm text-accentprimary/75">
              ({pronounsToString(authorInfo.pronouns)})
            </span>
          )}
        </h1>
        {
          <div className="gap-y-4 mr-0 sm:mr-8 max-w-3xl">
            {/* author profile picture */}
            <figure
              className="relative shrink-0 w-40 h-40 2xl:w-48 2xl:h-48"
              aria-label={`a digital portrait of ${authorInfo.name}`}
            >
              <Image
                src={authorInfo.avatar || starConcept}
                alt={`${authorInfo.name}'s profile picture`}
                className={
                  "object-cover rounded-md border-2 border-textcode bg-textcode/75"
                }
                fill
              />
            </figure>
            {/* author contribution stats */}
            <div className="normal-case mt-4">
              <span className="text-texttertiary text-sm font-mono">
                {numContributions > 0 && (
                  <span>
                    {numContributions} article{" "}
                    {numContributions === 1 ? "contribution" : "contributions"}
                  </span>
                )}
              </span>
              <div className="text-texttertiary text-sm font-mono">
                {
                  <span>
                    Contributor since{" "}
                    {new Date(authorInfo.createdAt).toLocaleString("en-US", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  </span>
                }
              </div>
            </div>
            {/* author bio */}
            <div className="block text-lg w-full mt-4 font-sans">
              {authorInfo.bio}
            </div>
          </div>
        }
      </section>
      <aside className="w-full md:w-fit xl:max-w-[32rem] grow">
        <h1 className="text-3xl md:text-4xl font-bold uppercase mb-5">
          Find {selectThirdPerson(authorInfo.pronouns)} At
        </h1>
        {
          <ul className="flex flex-col mx-auto md:max-w-none">
            {authorLinkTree.length === 0 ? (
              <>{`Nowhere else (yet). A lazy sundays blog exclusive!`}</>
            ) : (
              authorLinkTree.map((linkItem, i) => (
                <LinkButton
                  key={i}
                  className="w-full mb-3"
                  ariaLabel={`go to ${linkItem.siteName}`}
                  href={linkItem.link}
                >
                  {getDomainIcon(linkItem.link)}
                  {linkItem.siteName}
                </LinkButton>
              ))
            )}
          </ul>
        }
      </aside>
    </article>
  );
}
