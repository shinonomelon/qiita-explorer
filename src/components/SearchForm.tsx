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

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const normalizedKeyword = normalizeString(keyword);
    const normalizedTags = normalizeString(tags);
    const query = `${normalizedKeyword} ${normalizedTags
      .split(" ")
      .map((tag) => `tag:${tag}`)
      .join(" ")} stocks:>100`;
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
      <button
        type="submit"
        className="p-2 bg-blue-600 text-white rounded w-full"
      >
        Search
      </button>
    </form>
  );
}
