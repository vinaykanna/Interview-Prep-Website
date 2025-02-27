import { getTopics } from "@/utils/services";
import { useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router";
import TopicItem from "./TopicItem";

function TopicsGrid() {
  const params = useParams();
  const navigate = useNavigate();

  const { data, isLoading } = useQuery({
    queryKey: ["topics", params.slug || ""],
    queryFn: () => getTopics({ parent: params.slug || "" }),
  });

  if (isLoading) return null;

  return (
    <>
      {data?.data?.map((topic: any) => {
        return <TopicItem topic={topic} key={topic.id} navigate={navigate} />;
      })}
    </>
  );
}

export default TopicsGrid;
