import { apiTags } from "@/app/_lib/api-tags";

export const runtime = "edge";

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const page = searchParams.get("page");
  const pageSize = searchParams.get("pageSize");

  return await fetch(
    `${process.env.STRAPI_URI_ROOT}/api/articles?sort=publishedAt:desc&fields=publishedAt,title,slug,tagline,hero,heroAltText,readTime&populate[authors][fields]=slug,name&pagination[page]=${page}&pagination[pageSize]=${pageSize}`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${process.env.STRAPI_API_KEY}`,
      },
      next: {
        tags: [apiTags.listOfArticles],
      },
    }
  );
}
