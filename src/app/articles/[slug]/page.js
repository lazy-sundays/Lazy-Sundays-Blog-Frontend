import ReactMarkdown from 'react-markdown';
import remarkGfm from "remark-gfm";
import remarkEmoji from 'remark-emoji';
import rehypeRaw from "rehype-raw";
import CodeBlock from '../../_components/common/code-block';
import Link from 'next/link';
import View from '../../_components/view-tracking/view'
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { Redis } from "@upstash/redis";

const redis = Redis.fromEnv();

export async function generateMetadata({ params }, parent) {
    //fetch data
    const articleList = await fetch(
        process.env.STRAPI_URI_ROOT+"/api/articles?filters[slug][$eqi]="+params.slug+"&populate=*", 
        {
            method: "GET",
            headers: {
                "Authorization": "Bearer "+process.env.STRAPI_API_KEY,
            },
        }
    ).then((res) => res.json()).then((res) => res.data);
    const articleInfo= articleList[0];
    if (!articleInfo) notFound();

    // optionally access and extend (rather than replace) parent metadata
    const previousImages = (await parent).openGraph?.images || [];

    // build correctly-formatted author list
    const authors = articleInfo.attributes.authors.data.map((author) => {return ({name: author.attributes.name, url: `/authors/${author.attributes.slug}`})})

    return {
        title: articleInfo.attributes.title,
        description: articleInfo.attributes.tagline,
        authors: authors,
        openGraph: {
            type: 'article',
            siteName: 'the lazy sundays blog',
            locale: 'en_US',
            title: `${articleInfo.attributes.title} — the lazy sundays blog`,
            description: articleInfo.attributes.tagline,
            publishedTime: articleInfo.attributes.publishedAt,
            authors: authors.map((author) => author.name),
            images: [articleInfo.attributes.hero, ...previousImages],
        },
    }
}

export default async function Article({ params }) {
    async function getArticleInfo() {
        const res = await fetch(
            process.env.STRAPI_URI_ROOT+"/api/articles?filters[slug][$eqi]="+params.slug+"&populate=*", 
            {
                method: "GET",
                headers: {
                    "Authorization": "Bearer "+process.env.STRAPI_API_KEY,
                },
            }
        );
        
        if (!res.ok) {
            // This will activate the closest `error.js` Error Boundary
            throw new Error(`Failed to fetch article data. HTTP status code: ${res.status}`);
        }
        return res.json();
    }

    const articleList = (await getArticleInfo()).data;
    if (articleList.length === 0) notFound();
    const articleInfo = articleList[0];

    const views = (await redis.get(["pageviews", "page", `article${articleInfo.id}`].join(":"))) ?? 0;

    return (
        <article className="text-center">
            {
                <>
                    <header className="-mt-5">
                        <div className={"md:relative"}>
                            <div className={`relative mt-4 ${(articleInfo.attributes.hero == null) ? "" : "aspect-21/9"}`}>
                                { (articleInfo.attributes.hero != null) &&
                                    <Image fill={true} className="object-center object-cover" src={articleInfo.attributes.hero}/>
                                }
                            </div>
                            <div className={`${(articleInfo.attributes.hero == null) ? "pb-4":"md:absolute md:bottom-0"} pt-4 pb-4 md:pb-8 lg:pb-12 w-full px-4 sm:px-14 lg:px-20 text-center bg-white/50 dark:bg-black/50 backdrop-blur-sm`}>
                                <h2 className="text-5xl sm:text-4xl xl:6xl 2xl:text-7xl mb-4 font-header font-bold">{articleInfo.attributes.title}</h2>
                                <p className="font-sans text-xl sm:text-lg xl:text-2xl 2xl:text-3xl text-texttertiary italic px-5">{articleInfo.attributes.tagline}</p>
                            </div>
                        </div>
                        {/* article info */}
                        {
                            <div className="flex flex-wrap justify-center justify-items-center gap-x-10 gap-y-2 text-center max-w-96 mx-auto mt-5 px-5 text-sm" aria-hidden>
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
                                                    <Link href={`/authors/${author.attributes.slug}`} className="text-accentprimary font-bold hover:underline hover:decoration-accentprimary hover:decoration-2">
                                                        {author.attributes.name}
                                                    </Link>{(all.length > 1 && i < all.length-1) ? ", ": ""}
                                                </>
                                            );
                                        })
                                    }
                                </span>
                                <span className="italic">
                                    ~ {Math.round(articleInfo.attributes.readTime)} min. read
                                </span>
                                <span className="italic">
                                    <span className='text-accentsecondary font-bold'>{views}</span> views
                                </span>
                            </div>
                        }
                    </header>
                    {<hr className="w-[75ch] max-w-[80%] my-5 border-textprimary/25 m-auto" aria-hidden />}
                    {/* Article body */}
                    <section className={"flex justify-center mx-auto mb-10 text-lg"}>
                        <ReactMarkdown 
                            remarkPlugins={[remarkGfm, [remarkEmoji, { accessible: true }]]} 
                            rehypePlugins={[rehypeRaw]} 
                            className="prose prose-article max-w-full lg:max-w-[75ch] text-left"
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
                </>
            }
            <View id={`article${articleInfo.id}`}/>
        </article>
    );
}