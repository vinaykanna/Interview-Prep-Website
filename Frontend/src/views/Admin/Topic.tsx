import Button from "@/components/Button";
import QuestionsGrid from "@/components/Questions";
import TopicsGrid from "@/components/TopicsGrid";
import { useInterviewPrepAdminContext } from "@/InterviewPrepAdminContext";
import { useNavigate } from "react-router";
import { ChevronLeft } from "lucide-react";
import { twJoin } from "tailwind-merge";

function Topic() {
  const { setOpenUpsertTopic, setOpenUpsertQuestion } =
    useInterviewPrepAdminContext();
  const navigate = useNavigate();

  return (
    <div>
      <div className="flex justify-between  mt-10">
        <button
          onClick={() => navigate(-1)}
          className={twJoin(
            "cursor-pointer bg-gray-200 dark:bg-zinc-800 dark:text-white font-bold font-nunito-semibold",
            "px-2 py-1 rounded flex items-center gap-1"
          )}
        >
          <ChevronLeft className="w-4 h-4" /> Back
        </button>
        <div className="flex gap-4">
          <Button
            onClick={() => setOpenUpsertTopic(true)}
            className="bg-primary-solid"
          >
            Add Topic
          </Button>
          <Button
            onClick={() => setOpenUpsertQuestion(true)}
            className="bg-primary-solid"
          >
            Add Question
          </Button>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 mt-10 gap-10">
        <TopicsGrid />
      </div>
      <div>
        <QuestionsGrid />
      </div>
    </div>
  );
}

export default Topic;
