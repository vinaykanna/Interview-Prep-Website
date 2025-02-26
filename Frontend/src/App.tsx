import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router";
import Home from "./views/Home";
import Topics from "./views/Admin/Topics";
import Topic from "./views/Admin/Topic";
import Admin from "./views/Admin/Admin";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/admin" element={<Admin />}>
            <Route index element={<Navigate to="/admin/topics" />} />
            <Route path="topics" element={<Topics />} />
            <Route path="topics/:slug" element={<Topic />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
