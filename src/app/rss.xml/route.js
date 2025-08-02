import { apiTags } from "@/app/_lib/api-tags";

export async function GET() {
  // Get articles from CMS with all necessary fields for RSS
  let totalArticlePgs = 1;
  let articles = [];

  // only grab published articles
  for (let i = 1; i <= totalArticlePgs; i++) {
    const pageArticles = await fetch(
      `${process.env.STRAPI_URI_ROOT}/api/articles?sort=publishedAt:desc&fields=publishedAt,title,slug,tagline,hero,heroAltText&populate[authors][fields]=slug,name&pagination[page]=${i}&pagination[pageSize]=25`,
      {
        method: "GET",
        headers: {
          Authorization: "Bearer " + process.env.STRAPI_API_KEY,
        },
        next: {
          tags: [apiTags.rssFeed],
        },
      }
    )
      .then((res) => res.json())
      .then((res) => {
        totalArticlePgs = res.meta.pagination.pageCount;
        return res.data;
      });

    articles = articles.concat(pageArticles);
  }

  // Generate RSS XML
  const rssXml = generateRSSXML(articles);

  return new Response(rssXml, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
    },
  });
}

function generateRSSXML(articles) {
  const siteUrl = process.env.SITE_URL_ROOT;
  const currentDate = new Date().toUTCString();

  const rssItems = articles
    .map((article) => {
      const articleUrl = `${siteUrl}/articles/${article.slug}`;
      const publishedDate = new Date(article.publishedAt).toUTCString();
      const authors =
        article.authors?.map((author) => author.name).join(", ") ||
        "Lazy Sundays";

      return `
    <item>
      <title><![CDATA[${article.title}]]></title>
      <link>${articleUrl}</link>
      <guid isPermaLink="true">${articleUrl}</guid>
      <description><![CDATA[${article.tagline || ""}]]></description>
      <pubDate>${publishedDate}</pubDate>
      <author><![CDATA[${authors}]]></author>
    </item>`;
    })
    .join("");

  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Lazy Sundays Blog</title>
    <link>${siteUrl}</link>
    <description>Articles from the Lazy Sundays Blog</description>
    <language>en-us</language>
    <lastBuildDate>${currentDate}</lastBuildDate>
    <atom:link href="${siteUrl}/rss.xml" rel="self" type="application/rss+xml"/>
    ${rssItems}
  </channel>
</rss>`;
}
