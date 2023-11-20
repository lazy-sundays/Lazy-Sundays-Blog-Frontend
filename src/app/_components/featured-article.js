import Image from 'next/image';
import ReactMarkdown from 'react-markdown';
import remarkGfm from "remark-gfm";
import remarkEmoji from 'remark-emoji';
import rehypeFigure from "rehype-figure";
import rehypeRaw from "rehype-raw";
import CodeBlock from './common/code-block';
import LinkButton from './common/link-button';
import { apiTags } from '../_lib/api-tags';
import ArticleHeader from './articles/article-header';

export default async function FeaturedArticle() {
    async function getFeaturedArticleInfo() {
        const res = await fetch(
            process.env.STRAPI_URI_ROOT+"/api/featured-article?populate[article][populate]=*", 
            {
                method: "GET",
                headers: {
                    "Authorization": "Bearer "+process.env.STRAPI_API_KEY,
                },
                next: {
                    tags: [apiTags.featuredArticle]
                }
            }
        );
        
        if (!res.ok) {
            // This will activate the closest `error.js` Error Boundary
            throw new Error(`Failed to fetch featured article data. HTTP status code: ${res.status}`);
        }
        return res.json();
    }

    const articleInfo = (await getFeaturedArticleInfo()).data.attributes.article.data;

    return (
        <article className="text-center pt-8">
            <meta name="author" content={articleInfo.attributes.authors.data.map((author) => `${author.attributes.name}`)}></meta>
            <ArticleHeader 
                hero={articleInfo.attributes.hero}
                heroAltText={articleInfo.attributes.heroAltText}
                title={articleInfo.attributes.title}
                tagline={articleInfo.attributes.tagline}
                publishedAt={articleInfo.attributes.publishedAt}
                authors={articleInfo.attributes.authors}
                readTime={articleInfo.attributes.readTime}
            />
            {/* Article body */}
            <section className={"flex justify-center px-5 md:px-0 mx-auto mb-10 text-lg max-h-60 overflow-hidden gradient-mask-b-0"} inert="true">
                <ReactMarkdown 
                    remarkPlugins={[remarkGfm, [remarkEmoji, { accessible: true }]]} 
                    rehypePlugins={[rehypeFigure, rehypeRaw]} 
                    className="prose prose-article max-w-full md:max-w-[75ch] text-left"
                    components={{
                        code({inline, className, children, ...props}) {
                            const match = /language-(\w+)/.exec(className || '')
                            return !inline && match ? (
                                <CodeBlock
                                    {...props}
                                    language={match[1]}
                                    PreTag="div"
                                >
                                    {String(children).replace(/\n$/, '')}
                                </CodeBlock>
                            ) : (
                                <code {...props} className={className}>
                                    {children}
                                </code>
                            )
                        }
                        }}
                >
                    {articleInfo.attributes.body} 
                </ReactMarkdown>
            </section>
            {/* Featured article "continue reading" button */}
            <LinkButton 
                ariaLabel={"continue reading article"}
                href={`/articles/${articleInfo.attributes.slug}`}
                className={`sm:px-10 md:px-14 lg:px-120`}
            >
                <>Continue Reading</>
            </LinkButton>
        </article>
    );
}