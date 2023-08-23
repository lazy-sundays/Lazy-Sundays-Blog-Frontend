"use client"
import useSWRInfinite from 'swr/infinite'
import ContributorPlaque from "./contributor-plaque";
import Button from '../common/button';

export default function ListOfContributors() {
    const getKey = (pageIndex, previousPageData) => {
        if (previousPageData && (previousPageData.meta.pagination.page >= previousPageData.meta.pagination.pageCount)) return null; // reached the end
        return (`/api/authors?page=${(pageIndex + 1)}`); // SWR key
    };
    const fetcher = (url) => fetch(url, 
        { 
            method: "GET",
        }
    ).then((res) => (res.json()));
    const { data, error, isLoading, isValidating, size, setSize } = useSWRInfinite(getKey, fetcher, {
        initialSize: 1,
        revalidateFirstPage: false,
    });

    const hasMoreData = data && data[data.length-1].meta.pagination.page < data[data.length-1].meta.pagination.pageCount;

    if (error) throw new Error(`Failed to fetch contributor data.`);;
    return (
        <>
            <section className="w-full"> 
                <h1 className="text-3xl md:text-4xl font-bold uppercase mb-5">
                    List of Contributors
                </h1>
                <ul className="flex flex-col md:flex-none md:grid md:grid-cols-2 gap-6">
                    {!isLoading ?
                        data.map((page, i) => {
                            return (page.data.map((author, j) => {
                                return (
                                    <ContributorPlaque author={author} key={`${i}${j}`} />
                                );
                            }));
                        }) : <>Loading...</>
                    }
                </ul>
            </section>
            {
                    <Button 
                        onClick={() => setSize(size + 1)} 
                        ariaLabel='load more contributors' 
                        disabled={(isLoading || isValidating || !hasMoreData)} 
                        className={((!hasMoreData) ? "hidden" : undefined)}
                    >
                        {(isLoading || isValidating) ? "Loading..." : "Load More"}
                    </Button>
            }
        </>
    );
}