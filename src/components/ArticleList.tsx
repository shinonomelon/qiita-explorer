import { useFetchItems } from "../hooks/useFetchItems";
import { useSearchForm } from "../hooks/useSearchForm";
import { Loader } from "./Loader";

export function ArticleList() {
  const { items, status, error, isLoading } = useFetchItems();
  const { page, handleClickPrevious, handleClickNext } = useSearchForm();

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  if (status === "pending" && !items) {
    return null;
  }

  return (
    <div className="mb-8">
      <p>{items.length} results</p>
      {status === "success" && items.length > 0 && (
        <div className="flex flex-col gap-6 py-4">
          {items.map((article) => (
            <div
              key={article.id}
              className="bg-gray-100 p-6 rounded-lg shadow-lg"
            >
              <a
                href={article.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xl font-bold text-gray-800 hover:underline"
              >
                {article.title}
              </a>
              <div className="text-gray-600">
                <a href="#" className="hover:underline">
                  {article.user.id}
                </a>
                ・{article.likes_count} likes
              </div>
              <p className="text-gray-600">
                Posted on: {new Date(article.created_at).toLocaleDateString()}
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                {article.tags.map((tag) => (
                  <a
                    href="#"
                    key={tag.name}
                    className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm hover:underline"
                  >
                    {tag.name}
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
      <div className=" grid auto-cols-fr grid-flow-col gap-4 w-fit mt-4 mx-auto">
        <button
          onClick={handleClickPrevious}
          disabled={page === "1"}
          className="px-4 py-2 bg-gray-200 rounded"
        >
          Previous
        </button>
        <span className="px-4 py-2 text-center">{page}</span>
        <button
          onClick={handleClickNext}
          disabled={items.length < 10}
          className="px-4 py-2 bg-gray-200 rounded"
        >
          Next
        </button>
      </div>
    </div>
  );
}
