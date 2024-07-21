import { useState } from "react";
import { createdAtRange } from "../types";
import { convertCreatedAtRange, normalizeString } from "../lib/utils";
import { useNavigate } from "react-router-dom";

export const useSearchForm = (getItemsByQuery: (query: string) => void) => {
  const [keyword, setKeyword] = useState("");
  const [tags, setTags] = useState("");
  const [stocksCount, setStocksCount] = useState(100);
  const [createdAtRange, setCreatedAtRange] = useState<createdAtRange>("1y");

  const navigate = useNavigate();

  const updateQuery = (query: string) => {
    const parts = query.split(" ");
    const keywordPart = parts[0];
    const tagsPart = parts
      .filter((part) => part.startsWith("tag:"))
      .map((part) => part.split(":")[1])
      .join(" ");
    const stocksCountPart = parts
      .find((part) => part.startsWith("stocks:>="))
      ?.split(":>=")[1];
    const createdAtRangePart = parts
      .find((part) => part.startsWith("created:>="))
      ?.split(":>=")[1];

    if (createdAtRangePart)
      setCreatedAtRange(createdAtRangePart as createdAtRange);
    if (keywordPart) setKeyword(keywordPart);
    if (tagsPart) setTags(tagsPart);
    if (stocksCountPart) setStocksCount(Number(stocksCountPart));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!(keyword || tags)) {
      alert("Please enter keyword or tags");
      return;
    }

    const normalizedKeyword = normalizeString(keyword);
    const normalizedTags = normalizeString(tags)
      .split(" ")
      .map((tag) => `tag:${tag}`)
      .join(" ");

    const query = `${normalizedKeyword} ${normalizedTags} stocks:>=${stocksCount} `;

    const searchParams = new URLSearchParams({
      query: `${query} created:>=${createdAtRange}`,
    });
    navigate(`/?${searchParams.toString()}`);

    getItemsByQuery(
      `${query} created:>=${convertCreatedAtRange(createdAtRange)}`
    );
  };

  return {
    keyword,
    tags,
    stocksCount,
    createdAtRange,
    setKeyword,
    setTags,
    setStocksCount,
    setCreatedAtRange,
    updateQuery,
    handleSubmit,
  };
};
