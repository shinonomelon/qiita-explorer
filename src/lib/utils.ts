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
    case "1w":
      return `${year}-${month}-${date - 7}`;
    case "1m":
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
