import Button from "@/components/Button";
import TopicsGrid from "@/components/TopicsGrid";
import { useNavigate } from "react-router";

function Topic() {
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
          <Button>Add Topic</Button>
          <Button>Add Question</Button>
        </div>
      </div>
      <TopicsGrid />
    </div>
  );
}

export default Topic;
