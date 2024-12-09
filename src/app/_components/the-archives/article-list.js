"use client"
import useSWRInfinite from 'swr/infinite'
import Button from '../common/button';
import ArticleListItem from './article-list-item';

export default function ArticleList({ params }) { // eslint-disable-line
    const pageSize = 5;
    const getKey = (pageIndex, previousPageData) => {
        
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
        <>
            <section>
                <ul>
                    {!isLoading ? 
                        data.map((page) => {
                            return page.data.map((article, i) => {
                                return (
                                    <>
                                        
                                        <ArticleListItem article={article} key={i}/>
                                        {
                                            // current index is not the final item in current page of loaded data OR not in the final page of the current load
                                            ((i < page.data.length - 1) || (page.meta.pagination.page < size)) && 
                                            //then draw a horizontal line
                                            <hr className="mx-2 border-textprimary/25" />
                                        }
                                    </>
                                );
                            })
                        }) : <>Loading...</>
                    }
                </ul>
            </section>
            {
                <div className="mt-3 flex items-center mx-auto md:max-w-none justify-center">
                    <Button 
                        onClick={handleLoadMoreClick} 
                        ariaLabel='load more articles' 
                        disabled={(isLoading || isValidating || !hasMoreData)} 
                        className={`${((!hasMoreData) ? "hidden" : undefined)} sm:px-10 md:px-14 lg:px-120`}
                    >
                        {(isLoading || isValidating) ? "Loading..." : "Load More"}
                    </Button>
                </div>
            }
        </>
        
    )
}