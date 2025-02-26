import AddTopic from "@/components/AddTopic";
import Button from "@/components/Button";
import TopicsGrid from "@/components/TopicsGrid";
import { useState } from "react";
import { useNavigate } from "react-router";

function Topic() {
  const [open, setOpen] = useState(false);
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
          <Button onClick={() => setOpen(true)}>Add Topic</Button>
          <Button>Add Question</Button>
        </div>
      </div>
      <div className="grid grid-cols-3 mt-10 gap-10">
        <TopicsGrid />
      </div>
      {open && <AddTopic title="Create Topic" onClose={() => setOpen(false)} />}
    </div>
  );
}

export default Topic;
