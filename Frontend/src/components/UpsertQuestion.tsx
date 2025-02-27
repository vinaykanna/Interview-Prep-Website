import closeIcon from "../assets/close.svg";
import { twJoin, twMerge } from "tailwind-merge";
import TextField from "./TextField";
import Button from "./Button";
import { useEffect, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createQuestion, updateQuestion } from "@/utils/services";
import { useParams } from "react-router";
import markdown from "@/utils/markdown";

const UpsertQuestion = ({ onClose, questionData }: any) => {
  const queryClient = useQueryClient();
  const params = useParams();
  const [answerViewType, setAnswerViewType] = useState("source");
  const [state, setState] = useState({
    name: "",
    answer: "",
  });

  useEffect(() => {
    if (questionData) {
      setState({
        name: questionData.name,
        answer: questionData.answer,
      });
    }
  }, [questionData]);

  const { mutate } = useMutation({
    mutationKey: ["createQuestion"],
    mutationFn: createQuestion,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["questions", params.slug || ""],
      });
      onClose();
    },
  });

  const { mutate: questionUpdate } = useMutation({
    mutationKey: ["updateQuestion"],
    mutationFn: updateQuestion,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["questions", params.slug || ""],
      });
      onClose();
    },
  });

  const handleSubmit = () => {
    if (questionData) {
      questionUpdate({
        id: questionData.id,
        data: {
          name: state.name,
          answer: state.answer,
        },
      });
    } else {
      mutate({
        name: state.name,
        answer: state.answer,
        topic: params.slug,
      });
    }
  };

  return (
    <div
      className={twJoin(
        "fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#00000066]"
      )}
    >
      <div
        className={twJoin(
          "relative bg-white rounded-3xl shadow-xl w-full max-w-4xl transform overflow-y-auto max-h-[90vh]"
        )}
      >
        <div className="flex items-center justify-between py-4 px-7 border-b border-gray-200">
          <h3 className="text-[22px] text-secondary-solid font-bold font-nunito-bold">
            {questionData ? "Update Question" : "Create Question"}
          </h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 cursor-pointer"
          >
            <img src={closeIcon} alt="" className="w-4 h-4" />
          </button>
        </div>
        <div className="p-7">
          <TextField
            placeholder="Question"
            value={state.name}
            onChange={(e: any) => setState({ ...state, name: e.target.value })}
          />
          <div className="flex justify-end gap-2 mt-6 pr-2">
            <Button
              onClick={() => setAnswerViewType("source")}
              className={twMerge(
                "bg-transparent border text-secondary border-b-0 rounded-b-none",
                answerViewType === "source" && "bg-black text-white"
              )}
            >
              Source
            </Button>
            <Button
              onClick={() => setAnswerViewType("preview")}
              className={twMerge(
                "bg-transparent border text-secondary border-b-0 rounded-b-none",
                answerViewType === "preview" && "bg-black text-white"
              )}
            >
              Preview
            </Button>
          </div>
          {answerViewType === "source" && (
            <TextField
              placeholder="Answer"
              textArea
              rows={15}
              value={state.answer}
              onChange={(e: any) => {
                setState({ ...state, answer: e.target.value });
              }}
            />
          )}
          {answerViewType === "preview" && (
            <div
              className="markdown-body px-4 py-2 border-[1px] border-black border-solid rounded-lg h-[390px] overflow-y-auto"
              dangerouslySetInnerHTML={{
                __html: markdown.parse(state.answer, { breaks: true }),
              }}
            ></div>
          )}
          <Button
            onClick={handleSubmit}
            className="mt-6 w-full"
            disabled={!state.name || !state.answer}
          >
            Submit
          </Button>
        </div>
      </div>
    </div>
  );
};

export default UpsertQuestion;
