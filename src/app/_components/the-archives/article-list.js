"use client";
import useSWRInfinite from "swr/infinite";
import Button from "../common/button";
import ArticleListItem from "./article-list-item";
import { Fragment, useEffect } from "react";

export default function ArticleList({ filters }) {
  const pageSize = 5;
  const getKey = (pageIndex, previousPageData) => {
    if (
      previousPageData &&
      previousPageData.meta.pagination.page >=
        previousPageData.meta.pagination.pageCount
    )
      return null; // reached the end

    // Build query parameters
    const params = new URLSearchParams({
      page: pageIndex + 1,
      pageSize: pageSize,
    });

    // Add sort parameter if provided
    if (filters?.sort) {
      params.append("sort", filters.sort);
    }

    // Add search parameter if provided
    if (filters?.search) {
      params.append("search", filters.search);
    }

    return `/api/articles?${params.toString()}`; // SWR key
  };
  const fetcher = (url) =>
    fetch(url, {
      method: "GET",
      cache: "no-store",
    }).then((res) => res.json());
  const { data, error, isLoading, isValidating, size, setSize } =
    useSWRInfinite(getKey, fetcher, {
      initialSize: 1,
      revalidateFirstPage: false,
      revalidateOnMount: true,
    });

  // Reset pagination when filters change
  useEffect(() => {
    setSize(1);
  }, [filters?.sort, filters?.search, setSize]);

  const hasMoreData =
    data &&
    data.length > 0 &&
    data[data.length - 1]?.meta?.pagination &&
    data[data.length - 1].meta.pagination.page <
      data[data.length - 1].meta.pagination.pageCount;

  const handleLoadMoreClick = () => {
    setSize(size + 1);
  };

  if (error) throw new Error(`Failed to fetch archive data.`);

  // Check if we have data but no articles (empty search results)
  const hasNoResults = data && data.length > 0 && data[0]?.data?.length === 0;

  return (
    <>
      <section>
        <ul>
          {!isLoading ? (
            hasNoResults ? (
              <div className="text-center py-8">
                <p className="text-texttertiary text-lg">
                  No articles found matching your search criteria.
                </p>
                {filters?.search && (
                  <p className="text-texttertiary text-sm mt-2">
                    Try adjusting your search terms or clearing the search to
                    see all articles.
                  </p>
                )}
              </div>
            ) : (
              data?.map((page) => {
                return page?.data?.map((article, i) => {
                  return (
                    <Fragment key={article.id}>
                      <ArticleListItem article={article} />
                      {
                        // current index is not the final item in current page of loaded data OR not in the final page of the current load
                        (i < page.data.length - 1 ||
                          page?.meta?.pagination?.page < size) && (
                          //then draw a horizontal line
                          <hr className="mx-2 border-textprimary/25" />
                        )
                      }
                    </Fragment>
                  );
                });
              })
            )
          ) : (
            <>Loading...</>
          )}
        </ul>
      </section>
      {
        <div className="mt-3 flex items-center mx-auto md:max-w-none justify-center">
          <Button
            onClick={handleLoadMoreClick}
            ariaLabel="load more articles"
            disabled={isLoading || isValidating || !hasMoreData}
            className={`${
              !hasMoreData ? "hidden" : undefined
            } sm:px-10 md:px-14 lg:px-120`}
          >
            {isLoading || isValidating ? "Loading..." : "Load More"}
          </Button>
        </div>
      }
    </>
  );
}
