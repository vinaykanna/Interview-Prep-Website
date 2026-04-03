import { useState, useEffect, useMemo, useRef } from "react";
import { ChevronLeft, Search } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { searchQuestionsAndTopics } from "@/utils/services";
import debounce from "@/utils/debounce";
import { useNavigate, useParams } from "react-router";
import { twJoin } from "tailwind-merge";

const SearchDialog = ({ isOpen, setIsOpen }: any) => {
  const navigate = useNavigate();
  const params = useParams();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const resultsRef = useRef<(HTMLLIElement | null)[]>([]);

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

  useEffect(() => {
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const handleSearch = (value: string) => {
    setSearchQuery(value);
  };

  const questions = data?.data?.questions || [];
  const topics = data?.data?.topics || [];

  const flattenedResults = useMemo(() => {
    const results = [];
    if (topics.length > 0) {
      results.push(...topics.map((t: any) => ({ ...t, type: "topic" })));
    }
    if (questions.length > 0) {
      results.push(
        ...questions.map((q: any) => ({ ...q, type: "question" }))
      );
    }
    return results;
  }, [questions, topics]);

  useEffect(() => {
    setSelectedIndex(-1);
  }, [searchQuery]);

  useEffect(() => {
    if (selectedIndex !== -1 && resultsRef.current[selectedIndex]) {
      resultsRef.current[selectedIndex]?.scrollIntoView({
        block: "nearest",
        behavior: "smooth",
      });
    }
  }, [selectedIndex]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((prev) =>
        prev < flattenedResults.length - 1 ? prev + 1 : prev
      );
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev > 0 ? prev - 1 : prev));
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (selectedIndex !== -1) {
        const item = flattenedResults[selectedIndex];
        if (item.type === "topic") {
          handleClick(`/prep/${params.mainTopic}/${item.slug}`);
        } else {
          handleClick(
            `/prep/${params.mainTopic}/${item.topic}/questions/${item.slug}`
          );
        }
      }
    }
  };

  const debouncedSearch = debounce(handleSearch, 500);

  function handleClick(path: string) {
    navigate(path);
    setIsOpen(false);
  }



  return (
    <>
      <div
        className="fixed sm:overflow-hidden inset-0 bg-[rgba(0,0,0,0.5)] bg-opacity-50 flex sm:items-center justify-center z-50 transition-opacity duration-300"
        onClick={() => setIsOpen(false)}
      >
        <div
          className={twJoin(
            "bg-white dark:bg-gray-800 sm:rounded-xl shadow-2xl h-screen sm:h-auto w-full",
            "sm:max-w-lg sm:p-6 p-4 transform transition-all duration-300 scale-100 flex flex-col"
          )}
          onClick={(e) => e.stopPropagation()}
        >
          <div>
            <button
              onClick={() => setIsOpen(false)}
              className="cursor-pointer bg-gray-200 dark:bg-gray-700 dark:text-gray-300 px-2 py-1 rounded sm:hidden"
            >
              <ChevronLeft />
            </button>
          </div>
          <form className="mt-4">
            <div className="relative">
              <Search
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                size={20}
              />
              <input
                type="text"
                onChange={(e) => debouncedSearch(e.target.value)}
                placeholder="Search... (⌘E)"
                className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                autoFocus
                onKeyDown={handleKeyDown}
              />

            </div>
          </form>
          <div className="mt-4 sm:max-h-64 overflow-y-auto sm:flex-auto">
            {searchQuery ? (
              <div className="text-gray-600 dark:text-gray-300">
                {topics.length > 0 && (
                  <div className="mb-4">
                    <h3 className="text-md font-bold text-primary-solid mb-2">
                      Topics
                    </h3>
                    <ul className="space-y-1">
                      {topics.map((topic: any, index: number) => (
                        <SearchItem
                          ref={(el: HTMLLIElement | null) =>
                            (resultsRef.current[index] = el)
                          }
                          isActive={index === selectedIndex}
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
                      {questions.map((question: any, index: number) => {
                        const actualIndex = topics.length + index;
                        return (
                          <SearchItem
                            ref={(el: HTMLLIElement | null) =>
                              (resultsRef.current[actualIndex] = el)
                            }
                            isActive={actualIndex === selectedIndex}
                            label={question.name}
                            key={question?.id}
                            onClick={() => {
                              handleClick(
                                `/prep/${params.mainTopic}/${question.topic}/questions/${question.slug}`
                              );
                            }}
                          />
                        );
                      })}
                    </ul>
                  </div>
                )}
                {topics.length === 0 && questions.length === 0 && (
                  <p className="text-center text-gray-500 dark:text-gray-400 py-4">
                    No results found for "{searchQuery}"
                  </p>
                )}
              </div>
            ) : (
              <p className="text-gray-500 dark:text-gray-400 text-center py-4">
                Type to search...
              </p>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

function SearchItem({ onClick, label, isActive, ref }: any) {
  return (
    <li
      ref={ref}
      onClick={onClick}
      className={twJoin(
        "p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded cursor-pointer text-sm",
        isActive && "bg-gray-100 dark:bg-gray-700"
      )}
    >
      {label}
    </li>
  );
}

export default SearchDialog;
