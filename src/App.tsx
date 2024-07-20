import { ArticleList } from "./components/ArticleList";
import { Header } from "./components/Header";

// ダミーデータ
import { items } from "./data";

function App() {
  return (
    <div className="max-w-xl mx-auto pt-8">
      <Header />
      <ArticleList items={items} />
    </div>
  );
}

export default App;
