import { useState } from "react";
import { twJoin } from "tailwind-merge";
import ContextMenu from "./ContextMenu";

function TopiItem({ topic, navigate }: any) {
  const [isVisible, setIsVisible] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleRightClick = (e: any) => {
    e.preventDefault();
    setIsVisible(true);
    setPosition({ x: e.clientX, y: e.clientY });
  };

  return (
    <>
      <div
        onClick={() => navigate(`/admin/topics/${topic.slug}`)}
        onContextMenu={handleRightClick}
        key={topic.id}
        className={twJoin(
          "shadow-[0px_4px_10px_0px_#E77E3A33] rounded-lg p-2 cursor-pointer min-h-20",
          "flex justify-center items-center"
        )}
      >
        <h4 className="text-xl font-bold"> {topic.name}</h4>
      </div>
      {isVisible && topic?.parent !== null && (
        <ContextMenu
          setIsVisible={setIsVisible}
          position={position}
          topic={topic}
          type="topic"
        />
      )}
    </>
  );
}

export default TopiItem;
