"use client";
import { useState, useEffect } from "react";
import Button from "../common/button";

export default function ArticleFiltersWidget({ filters, onFiltersChange }) {
  const [searchInput, setSearchInput] = useState(filters?.search || "");

  const sortOptions = [
    { value: "publishedAt:desc", label: "Newest First" },
    { value: "publishedAt:asc", label: "Oldest First" },
  ];

  const handleSortChange = (event) => {
    const newSort = event.target.value;
    onFiltersChange({
      ...filters,
      sort: newSort,
    });
  };

  const handleSearchChange = (event) => {
    setSearchInput(event.target.value);
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    onFiltersChange({
      ...filters,
      search: searchInput.trim(),
    });
  };

  const handleClearSearch = () => {
    setSearchInput("");
    onFiltersChange({
      ...filters,
      search: "",
    });
  };

  // Update local search input when filters change externally
  useEffect(() => {
    setSearchInput(filters?.search || "");
  }, [filters?.search]);

  return (
    <div className="p-4 mb-4 rounded-md flex flex-col bg-bgsecondary">
      <h2 className="text-2xl uppercase font-bold mb-4">Refine Results</h2>

      {/* Active Search Indicator */}
      {filters?.search && (
        <div className="mb-4 p-3 bg-accentsecondary/25 border border-accentsecondary rounded-md">
          <p className="text-sm text-textprimary">
            <span className="font-semibold">Active search:</span> "
            {filters.search}"
          </p>
        </div>
      )}

      <div className="space-y-4">
        {/* Search Filter */}
        <div className="flex flex-col">
          <label
            htmlFor="search-input"
            className="text-sm font-semibold mb-2 text-textprimary"
          >
            Search Articles
          </label>
          <form
            onSubmit={handleSearchSubmit}
            className="flex flex-wrap place-content-between gap-2"
          >
            <input
              id="search-input"
              type="text"
              value={searchInput}
              onChange={handleSearchChange}
              placeholder="Search by title or topic : )"
              className="w-full flex-1 px-4 py-4 rounded-md border border-textprimary/25 bg-bgprimary text-textprimary placeholder-texttertiary focus:outline-none focus:ring-2 focus:ring-accentprimary focus:border-transparent"
            />
            <Button type="submit" className="w-full sm:w-fit">
              Search
            </Button>
            {filters?.search && (
              <button
                type="button"
                onClick={handleClearSearch}
                className="w-full sm:w-fit px-4 py-4 bg-texttertiary font-semibold text-lg text-bgprimary hove:text-bgprimary/80 rounded-md hover:bg-texttertiary/80 focus:outline-none focus:ring-2 focus:ring-texttertiary focus:ring-offset-2 transition-colors"
              >
                Clear
              </button>
            )}
          </form>
        </div>

        {/* Sort Filter */}
        <div className="flex flex-col">
          <label
            htmlFor="sort-select"
            className="text-sm font-semibold mb-2 text-textprimary"
          >
            Sort by Publication Date
          </label>
          <select
            id="sort-select"
            value={filters?.sort || "publishedAt:desc"}
            onChange={handleSortChange}
            className="px-4 py-4 rounded-md border border-textprimary/25 bg-bgprimary text-textprimary focus:outline-none focus:ring-2 focus:ring-accentprimary focus:border-transparent"
          >
            {sortOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}
