import { useState } from "react";

export function SearchForm() {
  const [keyword, setKeyword] = useState("");
  const [tags, setTags] = useState<string[]>([]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && e.currentTarget.value.trim()) {
      setTags([...tags, e.currentTarget.value.trim()]);
      e.currentTarget.value = "";
      e.preventDefault();
    }
  };

  const handleRemoveTag = (index: number) => {
    setTags(tags.filter((_, i) => i !== index));
  };

  return (
    <form className="mt-4">
      <input
        type="text"
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        placeholder="Keyword"
        className="p-2 border border-gray-300 rounded mb-2 w-full"
      />
      <div className="mb-2">
        <input
          type="text"
          onKeyDown={handleKeyDown}
          placeholder="Add a tag and press Enter"
          className="p-2 border border-gray-300 rounded mb-2 w-full"
        />
        <div className="flex flex-wrap gap-2">
          {tags.map((tag, index) => (
            <span
              key={index}
              className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm flex items-center"
            >
              {tag}
              <button onClick={() => handleRemoveTag(index)} className="ml-2">
                x
              </button>
            </span>
          ))}
        </div>
      </div>
      <button
        type="submit"
        className="p-2 bg-blue-600 text-white rounded w-full"
      >
        Search
      </button>
    </form>
  );
}
