import { ArticleList } from "./components/ArticleList";
import { Header } from "./components/Header";
import { SearchForm } from "./components/SearchForm";

import { useQiitaSearch } from "./hooks/useQiitaSearch";

// メインアプリケーションコンポーネント
export default function App() {
  const { items, loading, error, getItemsByQuery } = useQiitaSearch();

  return (
    <div className="max-w-xl mx-auto pt-8">
      <Header />
      <SearchForm getItemsByQuery={getItemsByQuery} />
      {!loading && <p>{items.length} results</p>}
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      {!loading && items.length > 0 && <ArticleList items={items} />}
    </div>
  );
}
