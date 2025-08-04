import { notFound } from "next/navigation";
import { draftMode } from "next/headers";
import { apiTags } from "@/app/_lib/api-tags";
import AuthorClient from "./client";

export async function generateMetadata(props, parent) {
  const params = await props.params;
  // Check if Next.js draft mode is enabled
  const { isEnabled: isDraftMode } = await draftMode();

  // Build query parameters
  let queryParams = `filters[slug][$eqi]=${params.slug}&populate=linkTree`;
  if (isDraftMode) {
    queryParams += "&status=draft";
  }

  //fetch data
  const authorList = await fetch(
    process.env.STRAPI_URI_ROOT + "/api/authors?" + queryParams,
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
    // Check if Next.js draft mode is enabled
    const { isEnabled: isDraftMode } = await draftMode();

    // Build query parameters
    let queryParams = `filters[slug][$eqi]=${params.slug}&populate=linkTree`;
    if (isDraftMode) {
      queryParams += "&status=draft";
    }

    const res = await fetch(
      process.env.STRAPI_URI_ROOT + "/api/authors?" + queryParams,
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
    <AuthorClient
      authorInfo={authorInfo}
      authorLinkTree={authorLinkTree}
      numContributions={numContributions}
    />
  );
}
