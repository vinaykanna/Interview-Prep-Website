import { createContext, useContext, useEffect, useState } from "react";
import UpsertQuestion from "@/components/UpsertQuestion";
import UpsertTopic from "@/components/UpsertTopic";
import { deleteQuestion, deleteTopic } from "@/utils/services";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useParams } from "react-router";

const InterviewPrepAdminContext = createContext<any>(null);

function InterviewPrepAdminProvider({ children }: any) {
  const params = useParams();
  const queryClient = useQueryClient();
  const [selectedTopic, setSelectedTopic] = useState<any>(null);
  const [selectedQuestion, setSelectedQuestion] = useState<any>(null);
  const [openUpsertTopic, setOpenUpsertTopic] = useState(false);
  const [openUpsertQuestion, setOpenUpsertQuestion] = useState(false);

  useEffect(() => {
    if (!openUpsertTopic) {
      setSelectedTopic(null);
    }

    if (!openUpsertQuestion) {
      setSelectedQuestion(null);
    }
  }, [openUpsertTopic, openUpsertQuestion]);

  const { mutateAsync: removeTopic } = useMutation({
    mutationKey: ["deleteTopic"],
    mutationFn: deleteTopic,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["topics", params.slug || ""],
      });
    },
  });

  const { mutateAsync: removeQuestion } = useMutation({
    mutationKey: ["deleteQuestion"],
    mutationFn: deleteQuestion,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["questions", params.slug || ""],
      });
    },
  });

  return (
    <InterviewPrepAdminContext.Provider
      value={{
        selectedQuestion,
        selectedTopic,
        setSelectedTopic,
        setSelectedQuestion,
        setOpenUpsertQuestion,
        setOpenUpsertTopic,
        removeQuestion,
        removeTopic,
      }}
    >
      {children}

      {openUpsertTopic && (
        <UpsertTopic
          topicData={selectedTopic}
          onClose={() => setOpenUpsertTopic(false)}
        />
      )}
      {openUpsertQuestion && (
        <UpsertQuestion
          questionData={selectedQuestion}
          onClose={() => setOpenUpsertQuestion(false)}
        />
      )}
    </InterviewPrepAdminContext.Provider>
  );
}

function useInterviewPrepAdminContext() {
  return useContext(InterviewPrepAdminContext);
}

export { InterviewPrepAdminProvider as default, useInterviewPrepAdminContext };
