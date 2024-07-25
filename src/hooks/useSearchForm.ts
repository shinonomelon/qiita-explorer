import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { convertCreatedAtRange, normalizeString } from "../lib/utils";
import { CreatedAtRange } from "../types";

export const useSearchForm = () => {
  const [keyword, setKeyword] = useState("");
  const [tags, setTags] = useState("");
  const [stocksCount, setStocksCount] = useState(100);
  const [createdAtRange, setCreatedAtRange] = useState<CreatedAtRange>("1w");

  const navigate = useNavigate();

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

    const query = `${normalizedKeyword} ${normalizedTags} stocks:>=${stocksCount} created:>${convertCreatedAtRange(
      createdAtRange
    )}`;

    const searchParams = new URLSearchParams({
      query,
    });

    navigate(`/?${searchParams.toString()}`);
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
    handleSubmit,
  };
};
