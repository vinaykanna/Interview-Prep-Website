import FloatingActionsMenu from "@/components/FloatingMenu";
import { Outlet } from "react-router";
import UploadAsset from "../UploadAsset";
import { useState } from "react";
import { useInterviewPrepAdminContext } from "@/InterviewPrepAdminContext";
import UpsertTopic from "@/components/UpsertTopic";
import UpsertQuestion from "@/components/UpsertQuestion";

function Admin() {
  const [isUploadAssetOpen, setIsUploadAssetOpen] = useState(false);
  const {
    openUpsertQuestion,
    openUpsertTopic,
    setOpenUpsertQuestion,
    setOpenUpsertTopic,
    selectedTopic,
    selectedQuestion,
  } = useInterviewPrepAdminContext();

  return (
    <section className="max-w-5xl mx-auto p-5">
      <h1 className="text-4xl text-center font-bold">Interview Prep Admin</h1>
      <Outlet />
      <FloatingActionsMenu setIsUploadAssetOpen={setIsUploadAssetOpen} />
      {isUploadAssetOpen && (
        <UploadAsset onClose={() => setIsUploadAssetOpen(false)} />
      )}
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
    </section>
  );
}

export default Admin;
