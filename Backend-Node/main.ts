import express from "express";
import cors from "cors";
import { commonRouter } from "./common/common.controller";
import { questionsRouter } from "./questions/questions.controller";
import { topicsRouter } from "./topics/topics.controller";

const app = express();
const PORT = 4000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/topics", topicsRouter);
app.use("/questions", questionsRouter);
app.use("/common", commonRouter);

// 404 fallback
app.use((_req, res) => {
  res.status(404).json({ message: "Route Not Found" });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
