import Header from "@/components/Header";
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
    <section>
      <Header title="Interview Prep Admin" showSearch={false} link="/admin/topics" />
      <div className="max-w-5xl mx-auto p-5">
        <Outlet />
      </div>
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
