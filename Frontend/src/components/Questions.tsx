import { getQuestions } from "@/utils/services";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router";
import Question from "./Question";

function QuestionsGrid() {
  const params = useParams();

  const { data, isLoading } = useQuery({
    queryKey: ["questions", params.slug || ""],
    queryFn: () => getQuestions({ topic: params.slug || "" }),
  });

  if (isLoading || !data?.data?.length) return null;

  return (
    <div className="mt-10">
      <h3 className="text-xl font-bold">Questions</h3>
      <div>
        {data?.data?.map((question: any) => {
          return <Question key={question.id} question={question} />;
        })}
      </div>
    </div>
  );
}

export default QuestionsGrid;
