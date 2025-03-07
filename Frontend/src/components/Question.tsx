import { useState } from "react";
import { twJoin } from "tailwind-merge";
import ContextMenu from "./ContextMenu";

function Question({ question }: any) {
  const [isVisible, setIsVisible] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleRightClick = (e: any) => {
    e.preventDefault();
    setIsVisible(true);
    setPosition({ x: e.pageX, y: e.pageY });
  };

  return (
    <>
      <div
        onContextMenu={handleRightClick}
        className={twJoin(
          "shadow-[0px_4px_10px_0px_#E77E3A33] rounded-lg",
          "p-4 cursor-pointer mt-4"
        )}
      >
        <h4 className="text-lg font-semibold">{question.name}</h4>
      </div>
      {isVisible && (
        <ContextMenu
          setIsVisible={setIsVisible}
          position={position}
          question={question}
          type="question"
        />
      )}
    </>
  );
}

export default Question;
