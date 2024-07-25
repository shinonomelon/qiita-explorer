import { Header } from "./components/Header";
import { ArticleList } from "./components/ArticleList";
import { SearchForm } from "./components/SearchForm";

export default function App() {
  return (
    <div className="max-w-xl mx-auto pt-8 px-4 md:px-0">
      <Header />
      <SearchForm />
      <ArticleList />
    </div>
  );
}
