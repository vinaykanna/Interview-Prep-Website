import { useEffect, useRef, useState } from "react";
import { ChevronDown, ChevronRight } from "lucide-react";
import { twJoin, twMerge } from "tailwind-merge";
import { useNavigate, useParams } from "react-router";
import { useInterviewPrepAdminContext } from "@/InterviewPrepAdminContext";

const Sidebar = ({ isOpen, setOpen, isDesktop }: any) => {
  const { getHierachicalTopics } = useInterviewPrepAdminContext();
  const menuRef = useRef<any>(null);
  const params = useParams();
  const [openItems, setOpenItems] = useState({});
  const menuItems = getHierachicalTopics(params.mainTopic || "");

  useEffect(() => {
    const handleClickOutside = (e: any) => {
      if (menuRef.current && !menuRef.current?.contains(e.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleItem = (id: any) => {
    setOpenItems((prev: any) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <div
      className={twMerge(
        "fixed z-10 top-0 h-full w-full lg:w-72 bg-[rgba(0,0,0,0.3)] lg:bg-transparent",
        isOpen ? "left-0" : "-left-full lg:-left-72"
      )}
    >
      <div
        ref={menuRef}
        className={twMerge(
          "h-full w-72 bg-white dark:bg-zinc-900 dark:border-r dark:border-zinc-800 shadow-lg flex flex-col"
        )}
      >
        <nav className="flex-1 overflow-y-auto">
          {menuItems?.map((item: any) => (
            <MenuItem
              key={item.id}
              item={item}
              toggleItem={toggleItem}
              openItems={openItems}
              setOpen={setOpen}
              isDesktop={isDesktop}
            />
          ))}
        </nav>
      </div>
    </div>
  );
};

function MenuItem({ toggleItem, openItems, setOpen, item, level = 0, isDesktop }: any) {
  const navigate = useNavigate();
  const params = useParams();
  const hasChildren = item.children && item.children.length > 0;
  const isOpen = openItems[item.id] || false;
  const isActive = params.topic === item.slug;

  return (
    <div className="relative">
      <button
        onClick={() => {
          if (hasChildren) {
            toggleItem(item.id);
            navigate(`${item.slug}`);
          }

          if (!hasChildren) {
            navigate(`${item.slug}`);
            if (!isDesktop) {
              setOpen(false);
            }
          }
        }}
        className={twMerge(
          "w-full flex cursor-pointer items-center justify-between p-3 pl-5",
          "text-gray-700 dark:text-zinc-300 transition-colors duration-200",
          "hover:bg-gray-100 dark:hover:bg-zinc-800",
          isActive && "bg-gray-100 dark:bg-zinc-800"
        )}
      >
        <div className="flex items-center gap-3">
          {item.icon && <span>{item.icon}</span>}
          <span className="text-base font-bold font-nunito-semibold">
            {item.name}
          </span>
        </div>
        {hasChildren &&
          (isOpen ? <ChevronDown size={16} /> : <ChevronRight size={16} />)}
      </button>
      {hasChildren && isOpen && (
        <div
          className={twJoin(
            "transition-all duration-300 overflow-hidden",
            "ml-5 border-l border-gray-300 dark:border-zinc-700"
          )}
        >
          {item.children.map((child: any) => (
            <MenuItem
              key={child.id}
              item={child}
              toggleItem={toggleItem}
              openItems={openItems}
              level={level + 1}
              setOpen={setOpen}
              isDesktop={isDesktop}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default Sidebar;
