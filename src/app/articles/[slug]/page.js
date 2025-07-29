import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkEmoji from "remark-emoji";
import rehypeRaw from "rehype-raw";
import CodeBlock from "../../_components/common/code-block";
import View from "../../_components/view-tracking/view";
import { notFound } from "next/navigation";
import { Redis } from "@upstash/redis";
import { apiTags } from "@/app/_lib/api-tags";
import ArticleHeader from "@/app/_components/articles/article-header";

if (!process.env.UPSTASH_REDIS_LOCAL) {
  const redis = Redis.fromEnv();
}

export async function generateMetadata(props, parent) {
  const params = await props.params;
  //fetch data
  const articleList = await fetch(
    process.env.STRAPI_URI_ROOT +
      "/api/articles?filters[slug][$eqi]=" +
      params.slug +
      "&populate=*",
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
  async function getArticleInfo() {
    const res = await fetch(
      process.env.STRAPI_URI_ROOT +
        "/api/articles?filters[slug][$eqi]=" +
        params.slug +
        "&populate=*",
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

  const views =
    (!process.env.UPSTASH_REDIS_LOCAL &&
      (await redis.get(
        ["pageviews", "page", `article${articleInfo.id}`].join(":")
      ))) ??
    1;

  return (
    <article className="text-center">
      {
        <>
          <ArticleHeader
            hero={articleInfo.hero}
            heroAltText={articleInfo.heroAltText}
            heroAttribution={articleInfo.heroAttribution}
            title={articleInfo.title}
            tagline={articleInfo.tagline}
            publishedAt={articleInfo.publishedAt}
            authors={articleInfo.authors}
            readTime={articleInfo.readTime}
            views={views}
          />
          {/* Article body */}
          <section className={"flex justify-center mx-auto mb-10 text-lg"}>
            <ReactMarkdown
              remarkPlugins={[remarkGfm, [remarkEmoji, { accessible: true }]]}
              rehypePlugins={[rehypeRaw]}
              className="prose prose-article max-w-full lg:max-w-[75ch] text-left"
              components={{
                code({ inline, className, children, ...props }) {
                  const match = /language-(\w+)/.exec(className || "");
                  return !inline && match ? (
                    <CodeBlock {...props} language={match[1]} PreTag="div">
                      {String(children).replace(/\n$/, "")}
                    </CodeBlock>
                  ) : (
                    <code {...props} className={className}>
                      {children}
                    </code>
                  );
                },
              }}
            >
              {articleInfo.body}
            </ReactMarkdown>
          </section>
        </>
      }
      {process.env.UPSTASH_REDIS_LOCAL ? (
        <></>
      ) : (
        <View id={`article${articleInfo.id}`} />
      )}
    </article>
  );
}
