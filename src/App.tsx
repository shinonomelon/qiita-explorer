import { useEffect, useState } from "react";
import { ArticleList } from "./components/ArticleList";
import { Header } from "./components/Header";
import { SearchForm } from "./components/SearchForm";

import { searchQiitaItems } from "./lib/api";
import { QiitaItem } from "./types";

const SAMPLE_QUERY = "react javascript created:>=2020-07-13 stocks:>1000";

function App() {
  const [items, setItems] = useState<QiitaItem[]>([]);

  const getPosts = async () => {
    const fetchedItems = await searchQiitaItems(SAMPLE_QUERY.trim());
    setItems(fetchedItems);
  };

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <div className="max-w-xl mx-auto pt-8">
      <Header />
      <SearchForm />
      <ArticleList items={items} />
    </div>
  );
}

export default App;
