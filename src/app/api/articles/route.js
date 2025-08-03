import { apiTags } from "@/app/_lib/api-tags";

export const runtime = "edge";

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const page = searchParams.get("page");
  const pageSize = searchParams.get("pageSize");
  const sort = searchParams.get("sort") || "publishedAt:desc";
  const search = searchParams.get("search");

  // Build query parameters using URLSearchParams for proper encoding
  const params = new URLSearchParams({
    sort: sort,
    fields: "publishedAt,title,slug,tagline,hero,heroAltText,readTime",
    "populate[0]": "authors",
    "populate[1]": "tags",
    "pagination[page]": page,
    "pagination[pageSize]": pageSize,
  });

  // Add search filters if search term is provided
  if (search && search.trim()) {
    const searchTerm = search.trim();
    // Use Strapi's $or operator to search title, tagline, and tags
    params.append("filters[$or][0][title][$containsi]", searchTerm);
    params.append("filters[$or][1][tagline][$containsi]", searchTerm);
    params.append("filters[$or][2][tags][tag][$containsi]", searchTerm);
  }

  const apiUrl = `${
    process.env.STRAPI_URI_ROOT
  }/api/articles?${params.toString()}`;

  try {
    const response = await fetch(apiUrl, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${process.env.STRAPI_API_KEY}`,
      },
      next: {
        tags: [apiTags.listOfArticles],
      },
    });

    if (!response.ok) {
      console.error("Strapi API Error:", response.status, response.statusText);
      const errorText = await response.text();
      console.error("Error details:", errorText);
    }

    return response;
  } catch (error) {
    console.error("Fetch error:", error);
    throw error;
  }
}
