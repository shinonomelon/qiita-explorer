import { ArticleList } from "./components/ArticleList";
import { Header } from "./components/Header";
import { Loader } from "./components/Loader";
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
      {loading && <Loader />}
      {error && <p>{error}</p>}
      {!loading && items.length > 0 && <ArticleList items={items} />}
    </div>
  );
}
