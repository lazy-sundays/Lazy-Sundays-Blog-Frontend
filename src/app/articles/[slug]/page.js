import Head from 'next/head';
import ReactMarkdown from 'react-markdown';
import remarkGfm from "remark-gfm";
import rehypeFigure from "rehype-figure";
import rehypeRaw from "rehype-raw";
import CodeBlock from '../../_components/common/code-block';
import Link from 'next/link';
import View from '../../_components/view-tracking/view'
import Image from 'next/image';

export async function generateMetadata({ params }, parent) {
    //fetch data
    const articleList = await fetch(
        process.env.STRAPI_URI_ROOT+"/api/articles?filters[slug][$eqi]=sample-markdown&populate=*", 
        {
            method: "GET",
            headers: {
                "Authorization": "Bearer "+process.env.STRAPI_API_KEY,
            },
        }
    ).then((res) => res.json()).then((res) => res.data);
    const articleInfo = articleList[0];

    // optionally access and extend (rather than replace) parent metadata
    const previousImages = (await parent).openGraph?.images || [];

    // build author 
    const authors = articleInfo.attributes.authors.data.map((author) => {return ({name: author.attributes.name, url: `/authors/${author.attributes.slug}`})})

    return {
        title: articleInfo.attributes.title,
        description: articleInfo.attributes.tagline,
        authors: authors,
        openGraph: {
            type: 'article',
            siteName: 'the lazy sundays blog',
            locale: 'en_US',
            title: articleInfo.attributes.title,
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
    if (articleList.length === 0) throw new Error("No matching article found");
    const articleInfo = articleList[0];

    return (
        <article className="text-center">
            {
                <>
                    <header className="">
                        <div className={"sm:relative"}>
                            <div className={`mt-4 ${(articleInfo.attributes.hero == null) ? "" : "aspect-21/9"}`}>
                                { (articleInfo.attributes.hero != null) &&
                                    <Image fill={true} className="object-center object-cover" src={articleInfo.attributes.hero}/>
                                }
                            </div>
                            <div className={`${(articleInfo.attributes.hero == null) ? "pb-4":"sm:absolute sm:bottom-0"} pt-4 pb-4 md:pb-8 lg:pb-12 w-full sm:px-10 md:px-24 xl:px-52 text-center bg-white/50 dark:bg-black/50 backdrop-blur-sm`}>
                                <h2 className="text-3xl md:text-4xl mb-4 px-5 font-bold">{articleInfo.attributes.title}</h2>
                                <p className="text-textsecondary italic px-5">{articleInfo.attributes.tagline}</p>
                            </div>
                        </div>
                        {/* article info */}
                        {
                            <div className="flex justify-center justify-items-center gap-x-10 text-center max-w-96 mx-auto mt-5 px-5 text-sm" aria-hidden>
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
                                                    <Link href={`/authors/${author.attributes.slug}`} className="text-accentprimary hover:underline hover:decoration-accentprimary hover:decoration-2">
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
                            </div>
                        }
                    </header>
                    {<hr className="w-1/3 my-5 border-textprimary/25 m-auto" aria-hidden />}
                    {/* Article body */}
                    <section className={"flex justify-center mx-auto mb-10 text-lg"}>
                        <ReactMarkdown 
                            remarkPlugins={[remarkGfm]} 
                            rehypePlugins={[rehypeFigure, rehypeRaw]} 
                            children={articleInfo.attributes.body} 
                            className="prose prose-article max-w-full md:max-w-[75ch] text-left"
                            components={{
                                code({node, inline, className, children, ...props}) {
                                  const match = /language-(\w+)/.exec(className || '')
                                  return !inline && match ? (
                                    <CodeBlock
                                      {...props}
                                      children={String(children).replace(/\n$/, '')}
                                      language={match[1]}
                                      PreTag="div"
                                    />
                                  ) : (
                                    <code {...props} className={className}>
                                      {children}
                                    </code>
                                  )
                                }
                            }}
                        />
                    </section>                    
                </>
            }
            <View id={articleInfo.id}/>
        </article>
    );
}