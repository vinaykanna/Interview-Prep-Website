import closeIcon from "../assets/close.svg";
import { twJoin, twMerge } from "tailwind-merge";
import TextField from "./TextField";
import Button from "./Button";
import { useEffect, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createQuestion, updateQuestion } from "@/utils/services";
import { useParams } from "react-router";
import markdown from "@/utils/markdown";
import Select from "./Select";
import { useInterviewPrepAdminContext } from "@/InterviewPrepAdminContext";

const difficulties = [
  { label: "Easy", value: "easy" },
  { label: "Medium", value: "medium" },
  { label: "Hard", value: "hard" },
];

const UpsertQuestion = ({ onClose, questionData }: any) => {
  const { allTopics } = useInterviewPrepAdminContext();
  const queryClient = useQueryClient();
  const params = useParams();
  const [answerViewType, setAnswerViewType] = useState("source");
  const [state, setState] = useState({
    topic: params.slug || "",
    difficulty: "easy",
    name: "",
    answer: "",
  });

  useEffect(() => {
    if (questionData) {
      setState({
        topic: questionData.topic,
        difficulty: questionData.difficulty || "",
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
          topic: state.topic,
          difficulty: state.difficulty,
          name: state.name,
          answer: state.answer,
        },
      });
    } else {
      mutate({
        topic: state.topic,
        difficulty: state.difficulty,
        name: state.name,
        answer: state.answer,
      });
    }
  };

  console.log({ allTopics });

  return (
    <div
      className={twJoin(
        "fixed inset-0 z-10 flex items-center justify-center p-4 bg-[#00000066]",
      )}
    >
      <div
        className={twJoin(
          "relative bg-white dark:bg-zinc-900 rounded-3xl shadow-xl w-full max-w-4xl transform overflow-y-auto max-h-[98vh]",
        )}
      >
        <div className="flex items-center justify-between py-4 px-7 border-b border-gray-200 dark:border-zinc-700">
          <h3 className="text-[22px] text-secondary-solid font-bold font-nunito-bold">
            {questionData ? "Update Question" : "Create Question"}
          </h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 dark:text-zinc-500 dark:hover:text-zinc-300 cursor-pointer"
          >
            <img src={closeIcon} alt="" className="w-4 h-4 dark:invert" />
          </button>
        </div>
        <div className="p-7">
          <Select
            selectClassName="w-full"
            placeholder="Select Topic"
            onChange={(e: any) => {
              setState({ ...state, topic: e.target.value });
            }}
            value={state.topic}
          >
            {allTopics?.map((topic: any) => {
              return (
                <option key={topic.slug} value={topic.slug}>
                  {topic?.parentName ? `${topic?.parentName} > ` : ""}
                  {topic.name}
                </option>
              );
            })}
          </Select>
          <Select
            className="mt-6"
            selectClassName="w-full"
            placeholder="Select Difficulty"
            onChange={(e: any) => {
              setState({ ...state, difficulty: e.target.value });
            }}
            value={state.difficulty}
            defaultOptionLabel="Select Difficulty"
          >
            {difficulties?.map((topic: any) => {
              return (
                <option key={topic.value} value={topic.value}>
                  {topic.label}
                </option>
              );
            })}
          </Select>
          <TextField
            placeholder="Question"
            value={state.name}
            onChange={(e: any) => setState({ ...state, name: e.target.value })}
            className="mt-6"
          />
          <div className="flex justify-end gap-2 mt-6 pr-2">
            <Button
              onClick={() => setAnswerViewType("source")}
              className={twMerge(
                "bg-transparent border text-secondary border-b-0 rounded-b-none dark:border-zinc-700 dark:text-zinc-300",
                answerViewType === "source" &&
                  "bg-black text-white dark:bg-zinc-800",
              )}
            >
              Source
            </Button>
            <Button
              onClick={() => setAnswerViewType("preview")}
              className={twMerge(
                "bg-transparent border text-secondary border-b-0 rounded-b-none dark:border-zinc-700 dark:text-zinc-300",
                answerViewType === "preview" &&
                  "bg-black text-white dark:bg-zinc-800",
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
              className="markdown-body px-4 py-2 border-[1px] border-black border-solid rounded-lg h-[390px] overflow-y-auto dark:border-zinc-700 dark:bg-zinc-900"
              dangerouslySetInnerHTML={{
                __html: markdown.parse(state.answer, { breaks: true }),
              }}
            ></div>
          )}
          <Button
            onClick={handleSubmit}
            className="mt-6 w-full bg-primary-solid"
            disabled={
              !state.name || !state.answer || !state.topic || !state.difficulty
            }
          >
            Submit
          </Button>
        </div>
      </div>
    </div>
  );
};

export default UpsertQuestion;
