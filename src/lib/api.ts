import axios from "axios";

import { FIRST_PAGE, MAX_PAGE } from "./const";

const API_URL = import.meta.env.VITE_QIITA_API_URL;
const ACCESS_TOKEN = import.meta.env.VITE_QIITA_API_TOKEN;

export const searchQiitaItems = async (query: string) => {
  try {
    const response = await axios.get(`${API_URL}/items`, {
      headers: {
        Authorization: `Bearer ${ACCESS_TOKEN}`,
      },
      params: { query, per_page: MAX_PAGE, page: FIRST_PAGE },
    });
    return response.data;
  } catch (error) {
    console.error("Qiitaの記事を検索にエラー:", error);
    throw error;
  }
};
