import { useQuery } from "@tanstack/react-query";
import { useLocation } from "react-router-dom";

import { searchQiitaItems } from "../lib/api";
import { QiitaItem } from "../types";

export const useFetchItems = (): {
  items: QiitaItem[];
  status: "pending" | "success" | "error";
  error: any;
} => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  // URLからquery取得
  const query = queryParams.get("query") || "";

  const {
    status,
    data: items,
    error,
  } = useQuery({
    queryKey: ["items", { query }],
    queryFn: async () => {
      const data = await searchQiitaItems(query);
      return data;
    },
    enabled: !!query,
  });

  return { status, items, error };
};
