import Link from 'next/link';
import Image from 'next/image';

export default function ArticleListItem({ article }) {

    
    return (
        <li className={`relative flex group ${("py-6")} mx-2 sm:px-8 hover:bg-bgsecondary`} key={article.attributes.id}>
            {(article.attributes.hero != null) && 
            <div className='relative aspect-16/9 h-28 -translate-x-1 sm:-translate-x-4'>
                <Image src={article.attributes.hero} alt={article.attributes.heroAltText} fill className="object-center object-cover"/>
            </div>
            }
            <div className='flex flex-col'>
                <span className="text-xs text-accentsecondary">
                    {(new Date(article.attributes.publishedAt)).toLocaleDateString( "en-US",
                        {month: '2-digit', day: '2-digit'}
                    )}
                </span>
                <h3 className="text-xl font-semibold group-hover:underline group-hover:decoration-accentprimary group-hover:decoration-2">
                    {article.attributes.title}
                </h3>
                <span className="text-l italic text-texttertiary ">
                    {article.attributes.tagline}
                </span>
                <span className="text-sm italic">
                    {
                        article.attributes.authors.data.map((author, i, all) => {
                            return (
                                <>
                                    <span className="">
                                        By: {author.attributes.name}
                                    </span>{(all.length > 1 && i < all.length-1) ? ", ": ""}
                                </>
                            );
                        })
                    }
                </span>
                <span className="text-sm italic group-hover:decoration-accentprimary group-hover:decoration-2">
                    ~ {Math.round(article.attributes.readTime)} min. read
                </span>
            </div>
            <Link href={`/articles/${article.attributes.slug}`} aria-label={"read article"}>
                <span className="absolute inset-0" aria-hidden/>
            </Link>
        </li>
    );
}