import { useInterviewPrepAdminContext } from "@/InterviewPrepAdminContext";
import markdown from "@/utils/markdown";
import { useNavigate, useParams } from "react-router";

function SubTopic() {
  const { getTipicBySlug } = useInterviewPrepAdminContext();
  const params = useParams();
  const navigate = useNavigate();

  const topicData = getTipicBySlug(params.topic || "");

  return (
    <section>
      <div className="flex flex-col-reverse sm:flex-row justify-between gap-2 sm:gap-6 items-start sm:items-center border-b border-gray-200 sm:pb-5 pb-2">
        <h3 className="text-3xl font-bold text-primary-solid">
          {topicData?.name}
        </h3>
        <button
          onClick={() => navigate(`questions`)}
          className="bg-primary-solid self-end sm:self-auto text-white text-sm px-4 py-2 rounded cursor-pointer"
        >
          Explore Questions
        </button>
      </div>
      <div
        className="markdown-body mt-6"
        dangerouslySetInnerHTML={{
          __html: markdown.parse(topicData?.description || "", {
            breaks: true,
          }),
        }}
      />
    </section>
  );
}

export default SubTopic;
