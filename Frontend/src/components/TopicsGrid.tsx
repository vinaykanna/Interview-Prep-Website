import { getTopics } from "@/utils/services";
import { useQuery } from "@tanstack/react-query";
import { twJoin } from "tailwind-merge";
import { useNavigate, useParams } from "react-router";

function TopicsGrid() {
  const params = useParams();
  const navigate = useNavigate();

  const { data } = useQuery({
    queryKey: ["topics"],
    queryFn: () => getTopics({ parent: params.slug || "" }),
  });

  return (
    <>
      {data?.data?.map((topic: any) => {
        return (
          <div
            onClick={() => navigate(`/admin/topics/${topic.slug}`)}
            key={topic.id}
            className={twJoin(
              "shadow-[0px_4px_10px_0px_#E77E3A33] rounded-lg p-2 cursor-pointer min-h-20",
              "flex justify-center items-center"
            )}
          >
            <h4 className="text-xl font-bold"> {topic.name}</h4>
          </div>
        );
      })}
    </>
  );
}

export default TopicsGrid;
