import { createContext, useContext, useEffect, useState } from "react";
import UpsertQuestion from "@/components/UpsertQuestion";
import UpsertTopic from "@/components/UpsertTopic";
import { deleteQuestion, deleteTopic, getTopics } from "@/utils/services";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useParams } from "react-router";

const InterviewPrepAdminContext = createContext<any>(null);

function InterviewPrepAdminProvider({ children }: any) {
  const params = useParams();
  const queryClient = useQueryClient();
  const [selectedTopic, setSelectedTopic] = useState<any>(null);
  const [selectedQuestion, setSelectedQuestion] = useState<any>(null);
  const [openUpsertTopic, setOpenUpsertTopic] = useState(false);
  const [openUpsertQuestion, setOpenUpsertQuestion] = useState(false);

  const { data, isLoading } = useQuery({
    queryKey: ["allTopics"],
    queryFn: () => getTopics({}),
  });

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

  const getTipicsByParent = (parent: string) => {
    return data?.data.filter((topic: any) => topic.parent === parent);
  };

  const getTipicBySlug = (slug: string) => {
    return data?.data.find((topic: any) => topic.slug === slug);
  };

  function buildHierarchy(items: any[]) {
    const itemMap = new Map();

    items?.forEach((item: any) =>
      itemMap.set(item.slug, { ...item, children: [] })
    );

    const result: any[] = [];

    items.forEach((item) => {
      if (item.parent === null) {
        result.push(itemMap.get(item.slug));
      } else {
        const parent = itemMap.get(item.parent);
        if (parent) {
          parent.children.push(itemMap.get(item.slug));
        }
      }
    });

    return result;
  }

  const getHierachicalTopics = (parent: string) => {
    const hierarchicalItems = buildHierarchy(data?.data);
    const items = hierarchicalItems.find((topic) => topic.slug === parent);

    return items?.children || [];
  };

  if (isLoading) return null;

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
        allTopics: data?.data,
        getTipicBySlug,
        getTipicsByParent,
        getHierachicalTopics,
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
