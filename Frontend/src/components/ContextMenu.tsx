import { useInterviewPrepAdminContext } from "@/InterviewPrepAdminContext";
import { useEffect, useRef } from "react";

function ContextMenu({ setIsVisible, topic, question, position, type }: any) {
  const menuRef: any = useRef(null);
  const {
    setOpenUpsertTopic,
    setOpenUpsertQuestion,
    setSelectedTopic,
    setSelectedQuestion,
    removeTopic,
    removeQuestion,
  } = useInterviewPrepAdminContext();

  useEffect(() => {
    const handleClickOutside = (e: any) => {
      if (menuRef.current && !menuRef.current?.contains(e.target)) {
        setIsVisible(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleEdit = () => {
    if (type === "topic") {
      setIsVisible(false);
      setOpenUpsertTopic(true);
      setSelectedTopic(topic);
    }

    if (type === "question") {
      setIsVisible(false);
      setOpenUpsertQuestion(true);
      setSelectedQuestion(question);
    }
  };

  const handleDelete = async () => {
    setIsVisible(false);

    const agreed = window.confirm(
      `Are you sure you want to delete this ${type}?`
    );

    if (type === "topic" && agreed) {
      await removeTopic(topic.id);
    }

    if (type === "question" && agreed) {
      await removeQuestion(question.id);
      setIsVisible(false);
    }
  };

  return (
    <>
      <div
        ref={menuRef}
        className="absolute bg-white shadow-lg rounded-lg py-2 w-48 text-gray-700 text-sm"
        style={{ top: `${position.y}px`, left: `${position.x}px` }}
      >
        <div
          onClick={handleEdit}
          className="px-4 py-2 hover:bg-indigo-50 hover:text-indigo-600 cursor-pointer"
        >
          Edit
        </div>
        <div
          onClick={handleDelete}
          className="px-4 py-2 hover:bg-indigo-50 hover:text-indigo-600 cursor-pointer"
        >
          Delete
        </div>
      </div>
    </>
  );
}

export default ContextMenu;
