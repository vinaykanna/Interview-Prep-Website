import { useNavigate, useParams } from "react-router";
import TopicItem from "./TopicItem";
import { useInterviewPrepAdminContext } from "@/InterviewPrepAdminContext";

function TopicsGrid() {
  const params = useParams();
  const navigate = useNavigate();
  const { getTipicsByParent } = useInterviewPrepAdminContext();
  const topics = getTipicsByParent(params.slug || null);

  return (
    <>
      {topics?.map((topic: any) => {
        return <TopicItem topic={topic} key={topic.id} navigate={navigate} />;
      })}
    </>
  );
}

export default TopicsGrid;
