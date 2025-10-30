import { notFound } from "next/navigation";
import { redis, isProduction } from "@/app/_lib/upstash-config";
import { apiTags } from "@/app/_lib/api-tags";
import { shouldFetchDraft } from "@/app/_lib/preview-utils";
import ArticleClient from "./client";

export async function generateMetadata(props, parent) {
  const params = await props.params;
  const searchParams = await props.searchParams;

  // Build query parameters
  let queryParams = `filters[slug][$eqi]=${params.slug}&populate=*`;

  // Check for preview tokens in URL (for initial server-side rendering)
  if (shouldFetchDraft(searchParams)) {
    queryParams += "&status=draft";
  }

  //fetch data
  const articleList = await fetch(
    process.env.STRAPI_URI_ROOT + "/api/articles?" + queryParams,
    {
      method: "GET",
      headers: {
        Authorization: "Bearer " + process.env.STRAPI_API_KEY,
      },
      next: {
        tags: [apiTags.article + params.slug],
      },
    }
  )
    .then((res) => res.json())
    .then((res) => res.data);
  const articleInfo = articleList[0];
  if (!articleInfo) notFound();

  // optionally access and extend (rather than replace) parent metadata
  const previousImages = (await parent).openGraph?.images || [];

  // build correctly-formatted author list
  const authors = articleInfo.authors.map((author) => {
    return { name: author.name, url: `/authors/${author.slug}` };
  });

  return {
    title: articleInfo.title,
    description: articleInfo.tagline,
    authors: authors,
    openGraph: {
      type: "article",
      siteName: "the lazy sundays blog",
      locale: "en_US",
      title: `${articleInfo.title} — the lazy sundays blog`,
      description: articleInfo.tagline,
      publishedTime: articleInfo.publishedAt,
      authors: authors.map((author) => author.name),
      images: [articleInfo.hero, ...previousImages],
    },
  };
}

export default async function Article(props0) {
  const params = await props0.params;
  const searchParams = await props0.searchParams;

  async function getArticleInfo() {
    // Build query parameters
    let queryParams = `filters[slug][$eqi]=${params.slug}&populate=*`;

    // Check for preview tokens in URL (for initial server-side rendering)
    if (shouldFetchDraft(searchParams)) {
      queryParams += "&status=draft";
    }

    const res = await fetch(
      process.env.STRAPI_URI_ROOT + "/api/articles?" + queryParams,
      {
        method: "GET",
        headers: {
          Authorization: "Bearer " + process.env.STRAPI_API_KEY,
        },
      }
    );

    if (!res.ok) {
      // This will activate the closest `error.js` Error Boundary
      throw new Error(
        `Failed to fetch article data. HTTP status code: ${res.status}`
      );
    }
    return res.json();
  }

  const articleList = (await getArticleInfo()).data;
  if (articleList.length === 0) notFound();
  const articleInfo = articleList[0];

  let views = 1;
  if (isProduction && redis) {
    try {
      const redisViews = await redis.get(
        ["pageviews", "page", `article${articleInfo.id}`].join(":")
      );
      views = redisViews ?? 1;
    } catch (error) {
      console.error("Error fetching views from Redis:", error);
      views = 1;
    }
  }

  return <ArticleClient articleInfo={articleInfo} views={views} />;
}
