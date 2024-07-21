import { useState } from "react";

import { convertCreatedAtRange, normalizeString } from "../lib/utils";
import { createdAtRange } from "../types";

export function SearchForm({
  getItemsByQuery,
}: {
  getItemsByQuery: (query: string) => void;
}) {
  const [keyword, setKeyword] = useState("");
  const [tags, setTags] = useState("");
  const [stocksCount, setStocksCount] = useState(100);
  const [createdAtRange, setCreatedAtRange] = useState<createdAtRange>("1y");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const normalizedKeyword = normalizeString(keyword);
    const normalizedTags = normalizeString(tags);
    const createdAt = convertCreatedAtRange(createdAtRange);

    const query = `${normalizedKeyword} ${normalizedTags
      .split(" ")
      .map((tag) => `tag:${tag}`)
      .join(" ")} stocks:>${stocksCount} created:>${createdAt}`;

    getItemsByQuery(query);
  };

  return (
    <form onSubmit={handleSubmit} className="my-4">
      <label htmlFor="keyword" className="block mb-1 font-semibold">
        Keyword (space-separated)
      </label>
      <input
        type="text"
        value={keyword}
        id="keyword"
        onChange={(e) => setKeyword(e.target.value)}
        placeholder="JavaScript React ..."
        className="p-2 border border-gray-300 rounded mb-2 w-full"
      />
      <label htmlFor="tags" className="block mb-1 font-semibold">
        Tags (space-separated)
      </label>
      <input
        type="text"
        id="tags"
        value={tags}
        onChange={(e) => setTags(e.target.value)}
        placeholder="to perform a more refined search"
        className="p-2 border border-gray-300 rounded mb-2 w-full"
      />

      <label htmlFor="stocksCount" className="block mb-1 font-semibold">
        Stocks Count (more than)
      </label>
      <select
        name="stocksCount"
        value={stocksCount}
        onChange={(e) => setStocksCount(Number(e.target.value))}
        id="stocksCount"
        className="p-2 border border-gray-300 rounded mb-2 w-full"
      >
        <option value="0">0</option>
        <option value="1">1</option>
        <option value="10">10</option>
        <option value="50">50</option>
        <option value="100">100</option>
        <option value="500">500</option>
        <option value="1000">1000</option>
      </select>

      <label htmlFor="createdAtRange" className="block mb-1 font-semibold">
        Range of creation date
      </label>
      <select
        name="createdAtRange"
        id="createdAtRange"
        value={createdAtRange}
        onChange={(e) => setCreatedAtRange(e.target.value as createdAtRange)}
        className="p-2 border border-gray-300 rounded mb-4 w-full"
      >
        <option value="1w">Week</option>
        <option value="1m">Month</option>
        <option value="1y">Year</option>
        <option value="5y">5 Year</option>
        <option value="10y">10 Year</option>
        <option value="all">All time</option>
      </select>

      <button
        type="submit"
        className="p-2 bg-blue-600 text-white rounded w-full"
      >
        Search
      </button>
    </form>
  );
}
