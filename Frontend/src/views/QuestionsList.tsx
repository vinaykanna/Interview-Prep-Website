import Tabs from "@/components/Tabs";
import { getQuestions } from "@/utils/services";
import { useQuery } from "@tanstack/react-query";
import { ChevronLeft } from "lucide-react";
import { useNavigate, useParams, useSearchParams } from "react-router";
import { twJoin } from "tailwind-merge";

function QuestionsList() {
  const params = useParams();
  const navigate = useNavigate();
  let [searchParams] = useSearchParams();

  const { data, isLoading } = useQuery({
    queryKey: ["topicQuestions", params.topic || ""],
    queryFn: () => getQuestions({ topic: params.topic || "" }),
  });

  if (isLoading) return null;

  const groupedQuestions = data?.data?.reduce((acc: any, question: any) => {
    const difficulty = question.difficulty;

    if (!acc[difficulty]) {
      acc[difficulty] = [];
    }

    acc[difficulty].push(question);

    return acc;
  }, {});

  const tabs = Object.keys(groupedQuestions).map((key) => ({
    title: key,
    value: key,
    order: key === "easy" ? 1 : key === "medium" ? 2 : 3,
  }));
  const sortedTabs = tabs?.sort((a: any, b: any) => a.order - b.order);
  const activeTab = searchParams.get("tab") || sortedTabs[0]?.value;

  return (
    <section>
      <button
        onClick={() => navigate(-1)}
        className={twJoin(
          "cursor-pointer bg-gray-200 font-bold font-nunito-semibold",
          "px-2 py-1 rounded flex items-center gap-1"
        )}
      >
        <ChevronLeft className="w-4 h-4" /> Back
      </button>
      {Object.keys(groupedQuestions)?.length > 1 && <Tabs tabs={sortedTabs} />}
      {groupedQuestions[activeTab]?.map((question: any) => {
        return (
          <div
            key={question.id}
            onClick={() => navigate(`${question.slug}`)}
            className={twJoin(
              "shadow-[0px_4px_10px_0px_#E77E3A33] rounded-lg",
              "p-4 cursor-pointer mt-4"
            )}
          >
            <h4 className="text-sm sm:text-base font-semibold">
              {question.name}
            </h4>
          </div>
        );
      })}
      {data?.data?.length === 0 && (
        <h4 className="text-lg font-bold text-gray-600 text-center mt-10">
          No questions found
        </h4>
      )}
    </section>
  );
}

export default QuestionsList;
