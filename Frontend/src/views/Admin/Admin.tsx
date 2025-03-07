import { Outlet } from "react-router";

function Admin() {
  return (
    <section className="max-w-5xl mx-auto p-5">
      <h1 className="text-4xl text-center font-bold">Interview Prep Admin</h1>
      <Outlet />
    </section>
  );
}

export default Admin;
