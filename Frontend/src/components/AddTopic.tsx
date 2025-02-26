import closeIcon from "../assets/close.svg";
import { twJoin } from "tailwind-merge";
import TextField from "./TextField";
import Button from "./Button";
import { useState } from "react";

const AddTopic = ({ onClose, title }: any) => {
  const [state, setState] = useState({
    name: "",
    description: "",
  });
  return (
    <div
      className={twJoin(
        "fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#00000066]"
      )}
    >
      <div
        className={twJoin(
          "relative bg-white rounded-3xl shadow-xl w-full max-w-lg transform"
        )}
      >
        <div className="flex items-center justify-between py-4 px-7 border-b border-gray-200">
          <h3 className="text-[22px] text-secondary-solid font-bold font-nunito-bold">
            {title}
          </h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 cursor-pointer"
          >
            <img src={closeIcon} alt="" className="w-4 h-4" />
          </button>
        </div>
        <div className="p-7">
          <TextField placeholder="Name" />
          <TextField
            placeholder="Description"
            textArea
            name="message"
            rows={3}
            className="mt-6"
          />
          <Button className="mt-6 w-full" disabled>
            Submit
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AddTopic;
