import axios from "axios";

import { MAX_PAGE } from "./const";

const API_URL = import.meta.env.VITE_QIITA_API_URL;
const ACCESS_TOKEN = import.meta.env.VITE_QIITA_API_TOKEN;

export const searchQiitaItems = async ({
  query,
  page,
}: {
  query: string;
  page: number;
}) => {
  try {
    const response = await axios.get(`${API_URL}/items`, {
      headers: {
        Authorization: `Bearer ${ACCESS_TOKEN}`,
      },
      params: { query, per_page: MAX_PAGE, page },
    });
    return response.data;
  } catch (error) {
    console.error("Failed to fetch items", error);
    throw error;
  }
};
