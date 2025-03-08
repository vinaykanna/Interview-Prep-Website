import { useSearchParams } from "react-router";
import { twJoin } from "tailwind-merge";

const Tabs = ({ tabs }: any) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const activeTab = searchParams.get("tab") || tabs[0]?.value;

  return (
    <div className="mt-6 max-w-3xl">
      <div className="flex border-b border-gray-200">
        {tabs
          ?.sort((a: any, b: any) => a.order - b.order)
          ?.map((tab: any, index: number) => (
            <button
              key={index}
              onClick={() => {
                setSearchParams({ tab: tab.value });
              }}
              className={twJoin(
                "cursor-pointer capitalize flex-1 py-3 px-4 text-base sm:text-lg",
                "font-bold font-nunito-semibold text-center transition-colors duration-200",
                activeTab === tab?.value
                  ? "border-b-2 border-indigo-500 text-indigo-600"
                  : "text-gray-500 hover:text-gray-700"
              )}
            >
              {tab.title}
            </button>
          ))}
      </div>
    </div>
  );
};

export default Tabs;
