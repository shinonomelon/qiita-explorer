import { useQuery } from "@tanstack/react-query";
import { useLocation } from "react-router-dom";

import { searchQiitaItems } from "../lib/api";
import { CreatedAtRange, QiitaItem } from "../types";
import { convertCreatedAtRange, parseQuery } from "../lib/utils";

export const useFetchItems = (): {
  items: QiitaItem[];
  status: "pending" | "success" | "error";
  error: any;
} => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  // URLからquery取得
  const query = queryParams.get("query") || "";

  const { keyword, tags, stocksCount, createdAtRange } = parseQuery(query);

  const updatedQuery = `${keyword} ${tags} stocks:>=${stocksCount} created:>=${convertCreatedAtRange(
    createdAtRange as CreatedAtRange
  )}`;

  const {
    status,
    data: items,
    error,
  } = useQuery({
    queryKey: ["items", { query }],
    queryFn: async () => {
      const data = await searchQiitaItems(updatedQuery);
      return data;
    },
    enabled: !!query,
  });

  return { status, items, error };
};
