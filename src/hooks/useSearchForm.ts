import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { normalizeString, parseQuery } from "../lib/utils";
import { CreatedAtRange } from "../types";

export const useSearchForm = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  const query = queryParams.get("query") || "";
  const page = queryParams.get("page") || "1";

  const [keyword, setKeyword] = useState("");
  const [tags, setTags] = useState("");
  const [stocksCount, setStocksCount] = useState(100);
  const [createdAtRange, setCreatedAtRange] = useState<CreatedAtRange>("1y");

  useEffect(() => {
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
      page,
    });

    navigate(`/?${searchParams.toString()}`);
  };

  const handleClickPrevious = () => {
    const page = queryParams.get("page") || "1";

    const searchParams = new URLSearchParams(location.search);
    searchParams.set("page", String(Number(page) - 1));
    navigate(`/?${searchParams.toString()}`);
  };

  const handleClickNext = () => {
    const page = queryParams.get("page") || "1";

    const searchParams = new URLSearchParams(location.search);
    searchParams.set("page", String(Number(page) + 1));
    navigate(`/?${searchParams.toString()}`);
  };

  return {
    keyword,
    tags,
    stocksCount,
    createdAtRange,
    page,
    setKeyword,
    setTags,
    setStocksCount,
    setCreatedAtRange,
    handleSubmit,
    handleClickPrevious,
    handleClickNext,
  };
};
