import { useQuery } from "@tanstack/react-query";
import { useLocation } from "react-router-dom";

import { searchQiitaItems } from "../lib/api";
import { CreatedAtRange, QiitaItem } from "../types";
import { convertCreatedAtRange, parseQuery } from "../lib/utils";

export const useFetchItems = (): {
  items: QiitaItem[];
  status: "pending" | "success" | "error";
  isLoading: boolean;
  error: any;
} => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  const page = Number(queryParams.get("page")) || 1;

  const query = queryParams.get("query") || "";

  const { keyword, tags, stocksCount, createdAtRange } = parseQuery(query);

  const updatedQuery = `${keyword} ${tags} stocks:>=${stocksCount} created:>=${convertCreatedAtRange(
    createdAtRange as CreatedAtRange
  )}`;

  const {
    status,
    data: items,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["items", { query, page }],
    queryFn: async () => {
      const data = await searchQiitaItems({ query: updatedQuery, page });
      return data;
    },
    enabled: !!query,
  });

  return { status, isLoading, items, error };
};
