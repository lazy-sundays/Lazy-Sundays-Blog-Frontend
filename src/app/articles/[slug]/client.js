"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkEmoji from "remark-emoji";
import rehypeRaw from "rehype-raw";
import CodeBlock from "../../_components/common/code-block";
import View from "../../_components/view-tracking/view";
import { isProduction, redis } from "@/app/_lib/upstash-config";
import ArticleHeader from "@/app/_components/articles/article-header";

export default function ArticleClient({ articleInfo, views }) {
  const router = useRouter();

  useEffect(() => {
    const handleMessage = async (message) => {
      if (
        message.origin === process.env.NEXT_PUBLIC_STRAPI_URL &&
        message.data.type === "strapiUpdate"
      ) {
        router.refresh();
      }
    };

    window.addEventListener("message", handleMessage);

    return () => {
      window.removeEventListener("message", handleMessage);
    };
  }, [router]);

  return (
    <article className="text-center">
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
      {isProduction && redis ? <View id={`article${articleInfo.id}`} /> : null}
    </article>
  );
}
