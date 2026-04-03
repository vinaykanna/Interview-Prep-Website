import closeIcon from "../assets/close.svg";
import { twJoin, twMerge } from "tailwind-merge";
import TextField from "./TextField";
import Button from "./Button";
import { useEffect, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createTopic, updateTopic } from "@/utils/services";
import { useParams } from "react-router";
import Select from "./Select";
import { useInterviewPrepAdminContext } from "@/InterviewPrepAdminContext";
import markdown from "@/utils/markdown";

const UpsertTopic = ({ onClose, topicData }: any) => {
  const { allTopics } = useInterviewPrepAdminContext();
  const queryClient = useQueryClient();
  const params = useParams();
  const [descriptionViewType, setDescriptionViewType] = useState("source");

  const [state, setState] = useState({
    name: "",
    description: "",
    parent: params.slug || "",
  });

  useEffect(() => {
    if (topicData) {
      setState({
        name: topicData.name,
        description: topicData.description || "",
        parent: topicData.parent || "",
      });
    }
  }, []);

  const { mutate } = useMutation({
    mutationKey: ["createTopic"],
    mutationFn: createTopic,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["topics", params.slug || ""],
      });
      onClose();
    },
  });

  const { mutate: topicUpdate } = useMutation({
    mutationKey: ["updateTopic"],
    mutationFn: updateTopic,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["topics", params.slug || ""],
      });
      onClose();
    },
  });

  const handleSubmit = () => {
    if (topicData) {
      topicUpdate({
        id: topicData.id,
        data: {
          name: state.name,
          description: state.description,
          parent: state.parent,
        },
      });
    } else {
      mutate({
        name: state.name,
        description: state.description,
        parent: state.parent,
      });
    }
  };

  return (
    <div
      className={twJoin(
        "fixed inset-0 z-10 flex items-center justify-center p-4 bg-[#00000066]"
      )}
    >
      <div
        className={twJoin(
          "relative bg-white dark:bg-zinc-900 rounded-3xl shadow-xl w-full max-w-4xl transform overflow-y-auto max-h-[98vh]"
        )}
      >
        <div className="flex items-center justify-between py-4 px-7 border-b border-gray-200 dark:border-zinc-700">
          <h3 className="text-[22px] text-secondary-solid font-bold font-nunito-bold">
            {topicData ? "Update Topic" : "Add Topic"}
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
              setState({ ...state, parent: e.target.value });
            }}
            value={state.parent}
          >
            {allTopics?.map((topic: any) => {
              return (
                <option key={topic.slug} value={topic.slug}>
                  {topic.name}
                </option>
              );
            })}
          </Select>
          <TextField
            placeholder="Name"
            onChange={(e: any) => setState({ ...state, name: e.target.value })}
            value={state.name}
            className="mt-6"
          />
          <div className="flex justify-end gap-2 mt-6 pr-2">
            <Button
              onClick={() => setDescriptionViewType("source")}
              className={twMerge(
                "bg-transparent border text-secondary border-b-0 rounded-b-none dark:border-zinc-700 dark:text-zinc-300",
                descriptionViewType === "source" && "bg-black text-white dark:bg-zinc-800"
              )}
            >
              Source
            </Button>
            <Button
              onClick={() => setDescriptionViewType("preview")}
              className={twMerge(
                "bg-transparent border text-secondary border-b-0 rounded-b-none dark:border-zinc-700 dark:text-zinc-300",
                descriptionViewType === "preview" && "bg-black text-white dark:bg-zinc-800"
              )}
            >
              Preview
            </Button>
          </div>
          {descriptionViewType === "source" && (
            <TextField
              placeholder="Description"
              textArea
              rows={15}
              value={state.description}
              onChange={(e: any) => {
                setState({ ...state, description: e.target.value });
              }}
            />
          )}
          {descriptionViewType === "preview" && (
            <div
              className="markdown-body px-4 py-2 border-[1px] border-black border-solid rounded-lg h-[390px] overflow-y-auto dark:border-zinc-700 dark:bg-zinc-900"
              dangerouslySetInnerHTML={{
                __html: markdown.parse(state.description || "", {
                  breaks: true,
                }),
              }}
            ></div>
          )}
          <Button
            onClick={handleSubmit}
            className="mt-6 w-full bg-primary-solid"
            disabled={!state.name || !state.description}
          >
            Submit
          </Button>
        </div>
      </div>
    </div>
  );
};

export default UpsertTopic;
