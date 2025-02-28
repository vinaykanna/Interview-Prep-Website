import { useState, useEffect } from "react";
import { Search } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { searchQuestionsAndTopics } from "@/utils/services";
import debounce from "@/utils/debounce";
import { useNavigate, useParams } from "react-router";

const SearchDialog = ({ setIsOpen }: any) => {
  const navigate = useNavigate();
  const params = useParams();
  const [searchQuery, setSearchQuery] = useState("");

  const { data } = useQuery({
    queryKey: ["search", searchQuery],
    queryFn: () => searchQuestionsAndTopics(searchQuery),
    enabled: !!searchQuery,
  });

  useEffect(() => {
    const handleEsc = (event: any) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, []);

  const handleSearch = (value: string) => {
    setSearchQuery(value);
  };

  const debouncedSearch = debounce(handleSearch, 500);

  function handleClick(path: string) {
    navigate(path);
    setIsOpen(false);
  }

  const questions = data?.data?.questions || [];
  const topics = data?.data?.topics || [];

  return (
    <>
      <div
        className="fixed inset-0 bg-[rgba(0,0,0,0.5)] bg-opacity-50 flex items-center justify-center z-50 transition-opacity duration-300"
        onClick={() => setIsOpen(false)}
      >
        <div
          className="bg-white rounded-xl shadow-2xl w-full max-w-lg p-6 transform transition-all duration-300 scale-100"
          onClick={(e) => e.stopPropagation()}
        >
          <form>
            <div className="relative">
              <Search
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                size={20}
              />
              <input
                type="text"
                onChange={(e) => debouncedSearch(e.target.value)}
                placeholder="Search..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                autoFocus
              />
            </div>
          </form>
          <div className="mt-4 max-h-64 overflow-y-auto">
            {searchQuery ? (
              <div className="text-gray-600">
                {topics.length > 0 && (
                  <div className="mb-4">
                    <h3 className="text-md font-bold text-primary-solid mb-2">
                      Topics
                    </h3>
                    <ul className="space-y-1">
                      {topics.map((topic: any) => (
                        <SearchItem
                          label={topic.name}
                          key={topic?.id}
                          onClick={() => {
                            handleClick(
                              `/prep/${params.mainTopic}/${topic.slug}`
                            );
                          }}
                        />
                      ))}
                    </ul>
                  </div>
                )}

                {questions.length > 0 && (
                  <div>
                    <h3 className="text-md font-semibold text-primary-solid mb-2">
                      Questions
                    </h3>
                    <ul className="space-y-1">
                      {questions.map((question: any) => (
                        <SearchItem
                          label={question.name}
                          key={question?.id}
                          onClick={() => {
                            handleClick(
                              `/prep/${params.mainTopic}/${question.topic}/${question.slug}`
                            );
                          }}
                        />
                      ))}
                    </ul>
                  </div>
                )}

                {topics.length === 0 && questions.length === 0 && (
                  <p className="text-center text-gray-500 py-4">
                    No results found for "{searchQuery}"
                  </p>
                )}
              </div>
            ) : (
              <p className="text-gray-500 text-center py-4">
                Type to search...
              </p>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

function SearchItem({ onClick, label }: any) {
  return (
    <li
      onClick={onClick}
      className="p-2 hover:bg-gray-100 rounded cursor-pointer text-sm"
    >
      {label}
    </li>
  );
}

export default SearchDialog;
