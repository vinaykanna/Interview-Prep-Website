import { getQuestions } from "@/utils/services";
import { useQuery } from "@tanstack/react-query";
import { ChevronLeft } from "lucide-react";
import { useNavigate, useParams } from "react-router";
import { twJoin } from "tailwind-merge";

function QuestionsList() {
  const params = useParams();
  const navigate = useNavigate();

  const { data, isLoading } = useQuery({
    queryKey: ["topicQuestions", params.topic || ""],
    queryFn: () => getQuestions({ topic: params.topic || "" }),
  });

  if (isLoading) return null;

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
      {data?.data?.map((question: any) => {
        return (
          <div
            onClick={() => navigate(`${question.slug}`)}
            className={twJoin(
              "shadow-[0px_4px_10px_0px_#E77E3A33] rounded-lg",
              "p-4 cursor-pointer mt-4"
            )}
          >
            <h4 className="text-base font-semibold">{question.name}</h4>
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
