/* eslint-disable no-irregular-whitespace */
import { useState } from "react";

// キーワードの正規化関数
const normalizeString = (keywords: string) => {
  return keywords
    .replace(/，/g, " ")
    .replace(/,/g, " ")
    .replace(/、/g, " ")
    .replace(/　/g, " ")
    .replace(/\s+/g, " ")
    .trim();
};

// 検索フォームコンポーネント
export function SearchForm({
  getItemsByQuery,
}: {
  getItemsByQuery: (query: string) => void;
}) {
  const [keyword, setKeyword] = useState("");
  const [tags, setTags] = useState("");
  const [stocksCount, setStocksCount] = useState(100);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const normalizedKeyword = normalizeString(keyword);
    const normalizedTags = normalizeString(tags);
    const query = `${normalizedKeyword} ${normalizedTags
      .split(" ")
      .map((tag) => `tag:${tag}`)
      .join(" ")} stocks:>${stocksCount}`;
    getItemsByQuery(query);
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <input
        type="text"
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        placeholder="Keyword (space-separated)"
        className="p-2 border border-gray-300 rounded mb-2 w-full"
      />
      <input
        type="text"
        value={tags}
        onChange={(e) => setTags(e.target.value)}
        placeholder="Tags (space-separated)"
        className="p-2 border border-gray-300 rounded mb-2 w-full"
      />
      <div className="mb-2">
        <label htmlFor="stocksCount" className="block mb-1 font-semibold">
          Stocks Count
        </label>
        <select
          name="stocksCount"
          value={stocksCount}
          onChange={(e) => setStocksCount(Number(e.target.value))}
          id="stocksCount"
          className="p-2 border border-gray-300 rounded w-full"
        >
          <option value="0">0</option>
          <option value="1">1</option>
          <option value="10">10</option>
          <option value="50">50</option>
          <option value="100">100</option>
          <option value="500">500</option>
          <option value="1000">1000</option>
        </select>
      </div>
      <button
        type="submit"
        className="p-2 bg-blue-600 text-white rounded w-full"
      >
        Search
      </button>
    </form>
  );
}
