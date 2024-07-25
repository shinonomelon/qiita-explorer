import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { normalizeString, parseQuery } from "../lib/utils";
import { CreatedAtRange } from "../types";

export const useSearchForm = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  const [keyword, setKeyword] = useState("");
  const [tags, setTags] = useState("");
  const [stocksCount, setStocksCount] = useState(100);
  const [createdAtRange, setCreatedAtRange] = useState<CreatedAtRange>("1y");

  useEffect(() => {
    const query = queryParams.get("query") || "";

    const { keyword, tags, stocksCount, createdAtRange } = parseQuery(query);

    setKeyword(keyword);
    setTags(tags);
    if (stocksCount) setStocksCount(Number(stocksCount));
    if (createdAtRange) setCreatedAtRange(createdAtRange as CreatedAtRange);
  }, [location.search]);

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

    const query = `${normalizedKeyword} ${normalizedTags} stocks:>=${stocksCount} created:>=${createdAtRange}`;

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
