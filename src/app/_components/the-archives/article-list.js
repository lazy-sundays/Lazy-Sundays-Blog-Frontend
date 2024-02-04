"use client"
import useSWRInfinite from 'swr/infinite'
import Link from 'next/link';
import Button from '../common/button';

export default function ArticleList({ params }) { // eslint-disable-line
    const getKey = (pageIndex, previousPageData) => {
        if (previousPageData && (previousPageData.meta.pagination.page >= previousPageData.meta.pagination.pageCount)) return null; // reached the end
        return (`/api/articles?page=${pageIndex + 1}&pageSize=${10}`); // SWR key
    };
    const fetcher = (url) => fetch(url, 
        { 
            method: "GET",
            cache: 'no-store',
        }
    ).then((res) => (res.json()));
    const { data, error, isLoading, isValidating, size, setSize } = useSWRInfinite(getKey, fetcher, {
        initialSize: 1,
        revalidateFirstPage: false,
    });

    const hasMoreData = data && data[data.length-1].meta.pagination.page < data[data.length-1].meta.pagination.pageCount;

    if (error) throw new Error(`Failed to fetch contributor data.`);
    return (
        <section>
            <ul>
                {!isLoading ? 
                    data.map((page) => {
                        return page.data.map((article, i, all) => {
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
                        })
                    }) : <>Loading...</>
                }
            </ul>
            {
                    <Button 
                        onClick={() => setSize(size + 1)} 
                        ariaLabel='load more articles' 
                        disabled={(isLoading || isValidating || !hasMoreData)} 
                        className={`${((!hasMoreData) ? "hidden" : undefined)} sm:px-10 md:px-14 lg:px-120`}
                    >
                        {(isLoading || isValidating) ? "Loading..." : "Load More"}
                    </Button>
            }
        </section>
    )
}