import FloatingActionsMenu from "@/components/FloatingMenu";
import { Outlet } from "react-router";
import UploadAsset from "../UploadAsset";
import { useState } from "react";

function Admin() {
  const [isUploadAssetOpen, setIsUploadAssetOpen] = useState(false);

  return (
    <section className="max-w-5xl mx-auto p-5">
      <h1 className="text-4xl text-center font-bold">Interview Prep Admin</h1>
      <Outlet />
      <FloatingActionsMenu setIsUploadAssetOpen={setIsUploadAssetOpen} />
      {isUploadAssetOpen && (
        <UploadAsset onClose={() => setIsUploadAssetOpen(false)} />
      )}
    </section>
  );
}

export default Admin;
