/* eslint-disable no-irregular-whitespace */
import { CreatedAtRange } from "../types";

// 文字列を正規化する関数
export const normalizeString = (keywords: string) => {
  return keywords
    .replace(/，/g, " ")
    .replace(/,/g, " ")
    .replace(/、/g, " ")
    .replace(/　/g, " ")
    .replace(/\s+/g, " ")
    .trim();
};

// createdAtRangeを(year-month-date)に変換する関数
export const convertCreatedAtRange = (createdAtRange: CreatedAtRange) => {
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth() + 1;
  const date = now.getDate();

  switch (createdAtRange) {
    case "7d":
      return `${year}-${month}-${date - 7}`;
    case "1M":
      return `${year}-${month - 1}-${date}`;
    case "1y":
      return `${year - 1}-${month}-${date}`;
    case "5y":
      return `${year - 5}-${month}-${date}`;
    case "10y":
      return `${year - 10}-${month}-${date}`;
    case "all":
      return "2011-01-01";
  }
};

export const parseQuery = (query: string) => {
  const parts = query.split(" ");

  const keyword = parts[0];
  const tags = parts
    .filter((part) => part.startsWith("tag:"))
    .map((part) => part.split(":")[1])
    .join(" ");
  const stocksCount = parts
    .find((part) => part.startsWith("stocks:>="))
    ?.split(":>=")[1];
  const createdAtRange = parts
    .find((part) => part.startsWith("created:>="))
    ?.split(":>=")[1];

  return { keyword, tags, stocksCount, createdAtRange };
};
