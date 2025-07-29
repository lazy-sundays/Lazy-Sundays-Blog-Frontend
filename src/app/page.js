import FeaturedArticle from "./_components/featured-article";
import Link from "next/link";
import { apiTags } from "./_lib/api-tags";
import { Fragment } from "react";

export const metadata = {
  title: "the lazy sundays blog",
  description: `This is the lazy sundays blog, a collective of personal blogs for games, movies. tv, music, etc.`,
};

export default async function Home() {
  async function getRecentArticles() {
    const res = await fetch(
      process.env.STRAPI_URI_ROOT +
        "/api/articles?sort=publishedAt:desc&fields=publishedAt,title,slug&populate[authors][fields]=name&pagination[page]=1&pagination[pageSize]=10",
      {
        method: "GET",
        headers: {
          Authorization: "Bearer " + process.env.STRAPI_API_KEY,
        },
        next: {
          tags: [apiTags.mostRecentArticles],
        },
      }
    );

    if (!res.ok) {
      // This will activate the closest `error.js` Error Boundary
      throw new Error(
        `Failed to fetch recent article data. HTTP status code: ${res.status}`
      );
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
              <Fragment key={article.id}>
                <li
                  className={`relative group ${"py-6"} mx-2 sm:px-8 hover:bg-bgsecondary`}
                  key={article.id}
                >
                  <div className="flex flex-col">
                    <span className="text-xs text-accentsecondary">
                      {((date) => {
                        return date.getFullYear() === new Date().getFullYear()
                          ? date.toLocaleDateString("en-US", {
                              month: "2-digit",
                              day: "2-digit",
                            })
                          : date.toLocaleDateString("en-US", {
                              month: "2-digit",
                              day: "2-digit",
                              year: "2-digit",
                            });
                      })(new Date(article.publishedAt))}
                    </span>
                    <span className="text-xl font-semibold group-hover:underline group-hover:decoration-accentprimary group-hover:decoration-2">
                      {article.title}
                    </span>
                    <span className="text-sm italic">
                      {article.authors.map((author, i, all) => {
                        return (
                          <Fragment key={author.id}>
                            <span className="">By: {author.name}</span>
                            {all.length > 1 && i < all.length - 1 ? ", " : ""}
                          </Fragment>
                        );
                      })}
                    </span>
                    <Link
                      href={`/articles/${article.slug}`}
                      aria-label={"read article"}
                    >
                      <span className="absolute inset-0" aria-hidden />
                    </Link>
                  </div>
                </li>
                {i < all.length - 1 && (
                  <hr className="mx-2 border-textprimary/25" />
                )}
              </Fragment>
            );
          })}
        </ul>
      </aside>
    </div>
  );
}
