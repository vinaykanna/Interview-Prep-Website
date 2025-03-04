import markdown from "@/utils/markdown";
import { getQuestion } from "@/utils/services";
import { useQuery } from "@tanstack/react-query";
import { ChevronLeft } from "lucide-react";
import { useNavigate, useParams } from "react-router";

function QuestionPage() {
  const navigate = useNavigate();
  const params = useParams();
  const { data, isLoading } = useQuery({
    queryKey: ["question", params.question || ""],
    queryFn: () => getQuestion({ topic: params.question || "" }),
  });

  if (isLoading) return null;

  return (
    <section>
      <button
        onClick={() => navigate(-1)}
        className="cursor-pointer bg-gray-200 font-bold font-nunito-semibold text-secondary-solid px-2 py-1 rounded flex items-center gap-1"
      >
        <ChevronLeft className="w-4 h-4" /> Back
      </button>
      <h3 className="text-2xl font-bold text-primary-solid mt-4">
        {data?.data?.name}
      </h3>
      <div
        className="markdown-body mt-4"
        dangerouslySetInnerHTML={{
          __html: markdown.parse(data?.data?.answer || ""),
        }}
      ></div>
    </section>
  );
}

export default QuestionPage;
