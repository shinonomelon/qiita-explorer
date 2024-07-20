import { ArticleList } from "./components/ArticleList";
import { Header } from "./components/Header";
import { SearchForm } from "./components/SearchForm";

// ダミーデータ
import { items } from "./data";

function App() {
  return (
    <div className="max-w-xl mx-auto pt-8">
      <Header />
      <SearchForm />
      <ArticleList items={items} />
    </div>
  );
}

export default App;
