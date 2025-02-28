import Header from "@/components/Header";
import Sidebar from "@/components/SideNav";
import { useState } from "react";
import { Outlet } from "react-router";

function MainTopic() {
  const [openMenu, setOpenMenu] = useState(false);

  return (
    <section className="sidebar">
      <Sidebar isOpen={openMenu} setOpen={setOpenMenu} />
      <aside className="ml-0 lg:ml-72">
        <Header setOpenMenu={setOpenMenu} />
        <main className="px-4 lg:px-8 py-4">
          <Outlet />
        </main>
      </aside>
    </section>
  );
}

export default MainTopic;
