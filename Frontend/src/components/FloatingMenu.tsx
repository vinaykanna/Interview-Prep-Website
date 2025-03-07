import { useState, useEffect, useRef } from "react";
import { twJoin } from "tailwind-merge";

const FloatingActionsMenu = ({ setIsUploadAssetOpen }: any) => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<any>(null);

  useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (menuRef.current && !menuRef.current?.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="fixed bottom-6 z-20 right-6" ref={menuRef}>
      <div
        className={twJoin(
          "absolute bottom-16 right-0 w-52 bg-white rounded-lg py-2 transition-all duration-200",
          "ease-in-out transform origin-bottom-right scale-95 opacity-0 shadow-[0px_4px_10px_0px_#E77E3A33]",
          isOpen && "scale-100 opacity-100"
        )}
      >
        <ul className="space-y-1">
          <ActionItem
            label="Upload Asset"
            onClick={() => {
              setIsOpen(false);
              setIsUploadAssetOpen(true);
            }}
          />
        </ul>
      </div>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={twJoin(
          "bg-indigo-600 text-white p-4 rounded-full shadow-lg hover:bg-indigo-700",
          "focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-offset-2",
          "transition-transform duration-200 transform hover:scale-105 cursor-pointer"
        )}
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d={isOpen ? "M6 18L18 6M6 6l12 12" : "M12 4v16m8-8H4"}
          />
        </svg>
      </button>
    </div>
  );
};

function ActionItem({ label, onClick }: any) {
  return (
    <li>
      <button
        className={twJoin(
          "w-full text-left px-4 py-2 text-base text-gray-700 cursor-pointer",
          "hover:bg-gray-100 hover:text-gray-900 transition-all font-bold font-nunito-semibold"
        )}
        onClick={onClick}
      >
        {label}
      </button>
    </li>
  );
}

export default FloatingActionsMenu;
