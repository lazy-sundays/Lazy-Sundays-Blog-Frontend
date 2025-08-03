"use client";
import { useState } from "react";
import ArticleFiltersWidget from "../_components/the-archives/article-filters-widget";
import ArticleList from "../_components/the-archives/article-list";

export default function TheArchivesClient({ params }) {
  // eslint-disable-line
  const [filters, setFilters] = useState({
    sort: "publishedAt:desc",
    search: "",
  });

  const handleFiltersChange = (newFilters) => {
    setFilters(newFilters);
  };

  return (
    <>
      <h1 className="text-3xl md:text-4xl font-bold uppercase mb-5">
        The Archives
      </h1>
      <ArticleFiltersWidget
        filters={filters}
        onFiltersChange={handleFiltersChange}
      />
      <ArticleList filters={filters} />
    </>
  );
}
