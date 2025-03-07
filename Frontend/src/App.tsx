import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router";
import Home from "./views/Home";
import Topics from "./views/Admin/Topics";
import Topic from "./views/Admin/Topic";
import Admin from "./views/Admin/Admin";
import MainTopic from "./views/MainTopic";
import SubTopic from "./views/SubTopic";
import QuestionPage from "./views/QuestionPage";
import Intro from "./components/Intro";
import UploadAsset from "./views/UploadAsset";
import InterviewPrepAdminProvider from "./InterviewPrepAdminContext";
import QuestionsList from "./views/QuestionsList";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <InterviewPrepAdminProvider>
          <Routes>
            <Route path="/">
              <Route index element={<Home />} />
              <Route path="/prep/:mainTopic" element={<MainTopic />}>
                <Route index element={<Intro />} />
                <Route path=":topic" element={<SubTopic />} />
                <Route path=":topic/questions" element={<QuestionsList />} />
                <Route
                  path=":topic/questions/:question"
                  element={<QuestionPage />}
                />
              </Route>
            </Route>
            <Route path="/admin" element={<Admin />}>
              <Route index element={<Navigate to="/admin/topics" />} />
              <Route path="topics" element={<Topics />} />
              <Route path="topics/:slug" element={<Topic />} />
            </Route>
            <Route path="/admin/upload-asset" element={<UploadAsset />} />
          </Routes>
        </InterviewPrepAdminProvider>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
