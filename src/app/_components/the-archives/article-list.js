"use client"
import useSWRInfinite from 'swr/infinite'
import Button from '../common/button';
import ArticleListItem from './article-list-item';
import { useState } from 'react';

export default function ArticleList({ params }) { // eslint-disable-line
    const [firstTime, setFirstTime] = useState(true);
    const getKey = (pageIndex, previousPageData) => {
        const pageSize = 5;
        if (previousPageData && (previousPageData.meta.pagination.page >= previousPageData.meta.pagination.pageCount)) return null; // reached the end
        return (`/api/articles?page=${pageIndex + 1}&pageSize=${pageSize}`); // SWR key
    };
    const fetcher = (url) => fetch(url, 
        { 
            method: "GET",
            cache: 'no-store',
        }
    )
        .then((res) => (res.json()));
    const { data, error, isLoading, isValidating, size, setSize } = useSWRInfinite(getKey, fetcher, {
        initialSize: 1,
        revalidateFirstPage: false,
    });

    const hasMoreData = data && data[data.length-1].meta.pagination.page < data[data.length-1].meta.pagination.pageCount;

    const handleLoadMoreClick = () => {
        setSize(size + 1);
    };
    
    if (error) throw new Error(`Failed to fetch archive data.`);
    return (
        <section>
            <ul>
                {!isLoading ? 
                    data.map((page) => {
                        return page.data.map((article, i) => {
                            return (
                                <>
                                    <hr className="mx-2 border-textprimary/25"/>
                                    <ArticleListItem article={article}/>
                                </>
                            );
                        })
                    }) : <>Loading...</>
                }
            </ul>
            {
                    <Button 
                        onClick={handleLoadMoreClick} 
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