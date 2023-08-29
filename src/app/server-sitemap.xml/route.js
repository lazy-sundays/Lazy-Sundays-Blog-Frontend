import { getServerSideSitemap } from 'next-sitemap'

export const revalidate = 60 * 60 * 24 // revalidate at most once per day

export async function GET(request) {
  // Get article/author slugs from cms
  let totalArticlePgs = 1;
  let articleSlugs = [];
  for (let i = 1; i <= totalArticlePgs; i++) {
    articleSlugs = articleSlugs.concat((await fetch(`${process.env.STRAPI_URI_ROOT}/api/articles?fields[0]=slug&pagination[page]=${i}`, {
      method: "GET",
      headers: {
          "Authorization": "Bearer "+process.env.STRAPI_API_KEY,
      },
    }).then((res) => res.json()).then((res) => {
      totalArticlePgs = res.meta.pagination.pageCount;
      return (res.data);
    })).map((article) => article.attributes.slug));
  }

  let totalAuthorPgs = 1;
  let authorSlugs = [];
  for (let i = 1; i <= totalAuthorPgs; i++) {
    authorSlugs = authorSlugs.concat((await fetch(`${process.env.STRAPI_URI_ROOT}/api/authors?fields[0]=slug&pagination[page]=${i}`, {
      method: "GET",
      headers: {
          "Authorization": "Bearer "+process.env.STRAPI_API_KEY,
      },
    }).then((res) => res.json()).then((res) => {
      totalAuthorPgs = res.meta.pagination.pageCount;
      return (res.data);
    })).map((author) => author.attributes.slug));
  }

  //build slugs into correctly formatted objects
  const articles = articleSlugs.map((slug) => {
    return ({
      loc: `${process.env.SITE_URL_ROOT}/articles/${slug}`,
      lastmod: new Date().toISOString(),
    })
  })
  const authors = authorSlugs.map((slug) => {
    return ({
      loc: `${process.env.SITE_URL_ROOT}/authors/${slug}`,
      lastmod: new Date().toISOString(),
    })
  })

  //join object arrays and return
  return getServerSideSitemap(articles.concat(authors));  
}