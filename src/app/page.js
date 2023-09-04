import FeaturedArticle from './_components/featured-article';
import Link from 'next/link';

export const metadata = {
    title: 'the lazy sundays blog',
    description: `This is the lazy sundays blog, a collective of personal blogs for games, movies. tv, music, etc.`
};

export default async function Home() {
  async function getRecentArticles() {
    const res = await fetch(
        process.env.STRAPI_URI_ROOT+"/api/articles?sort[0]=publishedAt:desc&fields[0]=publishedAt&fields[1]=title&fields[2]=slug&pagination[page]=1&pagination[pageSize]=10", 
        {
            method: "GET",
            headers: {
                "Authorization": "Bearer "+process.env.STRAPI_API_KEY,
            },
        }
    );
    
    if (!res.ok) {
        // This will activate the closest `error.js` Error Boundary
        throw new Error(`Failed to fetch recent article data. HTTP status code: ${res.status}`);
    }
    return res.json();
  }

  const recentArticles = (await getRecentArticles()).data;

  return (
    <div className="w-full flex xl:grid xl:grid-cols-[3fr_1fr] flex-wrap gap-x-10 gap-y-10">
      <section id="featured-article" className="grow max-w-full">
          <h1 className="text-3xl md:text-4xl font-bold uppercase mb-5">
              Featured Article
          </h1>
          <FeaturedArticle />
      </section>
      <aside id="recent-articles" className="grow">
            <h1 className="text-3xl md:text-4xl font-bold uppercase mb-5">
                Most Recent Articles
            </h1>
            <ul>
                {recentArticles.map((article, i, all) => {
                    return (
                        <>
                            <li className={`relative group ${("py-6")} mx-2 sm:px-8 hover:bg-bgsecondary`} key={article.attributes.id}>
                                <span className="text-xs text-accentprimary">
                                    {(new Date(article.attributes.publishedAt)).toLocaleDateString( "en-US",
                                        {month: '2-digit', day: '2-digit'}
                                    )}
                                </span>
                                <span className="ml-2 text-xl font-semibold group-hover:underline group-hover:decoration-accentprimary group-hover:decoration-2">
                                    {article.attributes.title}
                                </span>
                                <Link href={`/articles/${article.attributes.slug}`} aria-label={"read article"}>
                                    <span className="absolute inset-0" aria-hidden/>
                                </Link>
                            </li>
                            {(i < all.length-1) &&
                            <hr className="mx-2 border-textprimary/25" />
                            }
                        </>
                    );
                })}
            </ul>
      </aside>
    </div>
  )
}
