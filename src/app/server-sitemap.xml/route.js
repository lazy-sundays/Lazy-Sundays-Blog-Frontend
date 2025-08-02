import { getServerSideSitemap } from "next-sitemap";
import { apiTags } from "@/app/_lib/api-tags";

export async function GET() {
  // Get article slugs from cms
  let totalArticlePgs = 1;
  let articleSlugs = [];
  for (let i = 1; i <= totalArticlePgs; i++) {
    articleSlugs = articleSlugs.concat(
      (
        await fetch(
          `${process.env.STRAPI_URI_ROOT}/api/articles?fields=slug&pagination[page]=${i}&pagination[pageSize]=25`,
          {
            method: "GET",
            headers: {
              Authorization: "Bearer " + process.env.STRAPI_API_KEY,
            },
            next: {
              tags: [apiTags.sitemap],
            },
          }
        )
          .then((res) => res.json())
          .then((res) => {
            totalArticlePgs = res.meta.pagination.pageCount;
            return res.data;
          })
      ).map((article) => article.slug)
    );
  }
  // Get author slugs from cms
  let totalAuthorPgs = 1;
  let authorSlugs = [];
  for (let i = 1; i <= totalAuthorPgs; i++) {
    authorSlugs = authorSlugs.concat(
      (
        await fetch(
          `${process.env.STRAPI_URI_ROOT}/api/authors?fields=slug&pagination[page]=${i}&pagination[pageSize]=25`,
          {
            method: "GET",
            headers: {
              Authorization: "Bearer " + process.env.STRAPI_API_KEY,
            },
            next: {
              tags: [apiTags.sitemap],
            },
          }
        )
          .then((res) => res.json())
          .then((res) => {
            totalAuthorPgs = res.meta.pagination.pageCount;
            return res.data;
          })
      ).map((author) => author.slug)
    );
  }

  //build slugs into correctly formatted objects
  const articles = articleSlugs.map((slug) => {
    return {
      loc: `${process.env.SITE_URL_ROOT}/articles/${slug}`,
      lastmod: new Date().toISOString(),
    };
  });
  const authors = authorSlugs.map((slug) => {
    return {
      loc: `${process.env.SITE_URL_ROOT}/authors/${slug}`,
      lastmod: new Date().toISOString(),
    };
  });

  //join object arrays and return
  return getServerSideSitemap(articles.concat(authors));
}
