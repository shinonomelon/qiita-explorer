import { useState } from "react";

import { searchQiitaItems } from "../lib/api";

export const useQiitaSearch = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getItemsByQuery = async (query: string) => {
    setLoading(true);
    setError(null);
    try {
      const fetchedItems = await searchQiitaItems(query);
      setItems(fetchedItems);
      setLoading(false);
    } catch (error) {
      setError("記事の検索中にエラーが発生しました");
    }
  };

  return { items, loading, error, getItemsByQuery };
};
