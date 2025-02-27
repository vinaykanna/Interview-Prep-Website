import Button from "@/components/Button";
import QuestionsGrid from "@/components/Questions";
import TopicsGrid from "@/components/TopicsGrid";
import { useInterviewPrepAdminContext } from "@/InterviewPrepAdminContext";
import { useNavigate } from "react-router";

function Topic() {
  const { setOpenUpsertTopic, setOpenUpsertQuestion } =
    useInterviewPrepAdminContext();
  const navigate = useNavigate();

  return (
    <div>
      <div className="flex justify-between  mt-10">
        <Button
          onClick={() => navigate(-1)}
          className="bg-transparent border text-secondary "
        >
          Back
        </Button>
        <div className="flex gap-4">
          <Button onClick={() => setOpenUpsertTopic(true)}>Add Topic</Button>
          <Button onClick={() => setOpenUpsertQuestion(true)}>
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
