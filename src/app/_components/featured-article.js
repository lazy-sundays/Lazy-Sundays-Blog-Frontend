import ReactMarkdown from 'react-markdown';
import remarkGfm from "remark-gfm";
import rehypeFigure from "rehype-figure";
import rehypeRaw from "rehype-raw";
import CodeBlock from './common/code-block';
import LinkButton from './common/link-button';

export default async function FeaturedArticle() {
    async function getFeaturedArticleInfo() {
        const res = await fetch(
            process.env.STRAPI_URI_ROOT+"/api/featured-article?populate[article][populate]=*", 
            {
                method: "GET",
                headers: {
                    "Authorization": "Bearer "+process.env.STRAPI_API_KEY,
                },
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
        <article className="text-center">
            <meta name="author" content={articleInfo.attributes.authors.data.map((author, i, all) => `${author.attributes.name}`)}></meta>
            <header className="">
                <div className={"sm:relative sm:mb-10"}>
                    <div className={`mt-4 ${(articleInfo.attributes.hero == null) ? "" : "aspect-21/9"}`}>
                        { (articleInfo.attributes.hero != null) &&
                            <img className="w-full h-full object-center object-cover" src={articleInfo.attributes.hero}/>
                        }
                    </div>
                    <div className={`${(articleInfo.attributes.hero == null) ? "pb-4":"sm:absolute sm:bottom-0"} pt-4 pb-4 w-full sm:px-10 md:px-24 xl:px-52 text-center bg-white/50 dark:bg-black/50 backdrop-blur-sm`}>
                        <h2 className="text-3xl md:text-4xl mb-4 px-5 font-bold">{articleInfo.attributes.title}</h2>
                        <p className="text-textsecondary italic px-5">{articleInfo.attributes.tagline}</p>
                        {/* Featured article info */}
                        {
                            <div className={"flex justify-center justify-items-center gap-x-10 text-center text-sm max-w-96 mx-auto mt-5 px-5 sm:pb-4"}>
                                <span className="italic">
                                    {       
                                        (new Date(articleInfo.attributes.publishedAt)).toLocaleDateString( "en-US",
                                            {month: 'short', day: 'numeric', year: 'numeric'})
                                    }
                                </span>
                                <span className="">
                                    Words by {(articleInfo.attributes.authors.data.length === 0) && "Anonymous"}
                                    {
                                        articleInfo.attributes.authors.data.map((author, i, all) => {
                                            return (
                                                <>
                                                    <a href={`/authors/${author.attributes.slug}`} className="text-accentprimary hover:underline hover:decoration-accentprimary hover:decoration-2">
                                                        {author.attributes.name}
                                                    </a>{(all.length > 1 && i < all.length-1) ? ", ": ""}
                                                </>
                                            );
                                        })
                                    }
                                </span>
                                <span className="italic">
                                    ~ {Math.round(articleInfo.attributes.readTime)} min. read
                                </span>
                            </div>
                        }
                    </div>
                </div>
            </header>
            <hr className="w-1/3 my-5 border-textprimary/25 m-auto" aria-hidden />
            {/* Article body */}
            <section className={"flex justify-center px-5 md:px-0 mx-auto mb-10 text-lg max-h-60 overflow-hidden gradient-mask-b-0"} inert="true">
                <ReactMarkdown 
                    remarkPlugins={[remarkGfm]} 
                    rehypePlugins={[rehypeFigure, rehypeRaw]} 
                    className="prose prose-article max-w-full md:max-w-[75ch] text-left"
                    components={{
                        code({node, inline, className, children, ...props}) {
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