import markdown from "@/utils/markdown";
import { getQuestion } from "@/utils/services";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router";

function QuestionPage() {
  const params = useParams();
  const { data, isLoading } = useQuery({
    queryKey: ["question", params.question || ""],
    queryFn: () => getQuestion({ topic: params.question || "" }),
  });

  if (isLoading) return null;

  return (
    <section>
      <h3 className="text-2xl font-bold text-primary-solid">
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
