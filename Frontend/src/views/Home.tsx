import { getTopics } from "@/utils/services";
import { useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router";
import { twJoin } from "tailwind-merge";

function Home() {
  const params = useParams();
  const navigate = useNavigate();

  const { data, isLoading } = useQuery({
    queryKey: ["topics", params.slug || "none"],
    queryFn: () => getTopics({ parent: params.slug || "none" }),
  });

  if (isLoading) return null;

  return (
    <section className="max-w-5xl mx-auto p-5">
      <h1 className="text-3xl text-center font-bold">Interview Prep</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 mt-10 gap-10">
        {data?.data?.map((topic: any) => {
          return (
            <div
              onClick={() => navigate(`/prep/${topic.slug}`)}
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
      </div>
    </section>
  );
}

export default Home;
