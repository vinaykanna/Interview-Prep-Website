import closeIcon from "../assets/close.svg";
import { twJoin } from "tailwind-merge";
import TextField from "./TextField";
import Button from "./Button";
import { useEffect, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createTopic, updateTopic } from "@/utils/services";
import { useParams } from "react-router";
import Select from "./Select";
import { useInterviewPrepAdminContext } from "@/InterviewPrepAdminContext";

const UpsertTopic = ({ onClose, topicData }: any) => {
  const { allTopics } = useInterviewPrepAdminContext();
  const queryClient = useQueryClient();
  const params = useParams();
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
            {topicData ? "Update Topic" : "Add Topic"}
          </h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 cursor-pointer"
          >
            <img src={closeIcon} alt="" className="w-4 h-4" />
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
          <TextField
            placeholder="Description"
            textArea
            name="message"
            rows={3}
            className="mt-6"
            value={state.description}
            onChange={(e: any) => {
              setState({ ...state, description: e.target.value });
            }}
          />
          <Button
            onClick={handleSubmit}
            className="mt-6 w-full"
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
