import { getTopics } from "@/utils/services";
import { useQuery } from "@tanstack/react-query";

function SideBar() {
  const { data } = useQuery({ queryKey: ["topics"], queryFn: getTopics });

  return (
    <aside className="bg-gray-200 w-3xs h-full fixed left-0 top-0">
      {data?.data?.map((topic: any) => {
        return (
          <div key={topic.id} className="p-2">
            {topic.name}
          </div>
        );
      })}
    </aside>
  );
}

export default SideBar;
