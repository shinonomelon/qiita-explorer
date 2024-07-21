export function Loader() {
  return (
    <div className="flex flex-col gap-6 py-4">
      {Array.from({ length: 3 }).map((_, index) => (
        <div
          key={index}
          className="p-6 shadow-lg animate-pulse bg-gray-200 rounded-lg"
        >
          <div className="h-6 mb-2 bg-gray-400 rounded w-3/4"></div>
          <div className="h-5 mb-2 bg-gray-400 rounded w-1/3"></div>
          <div className="h-5 bg-gray-400 rounded w-1/3"></div>{" "}
          <div className="mt-4 flex flex-wrap gap-2">
            {Array.from({ length: 4 }).map((_, index) => (
              <div
                key={index}
                className="bg-gray-400 text-white p-3.5 px-8 rounded-full text-sm hover:underline"
              ></div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
