import { Router } from "express";
import {
  createTopic,
  deleteTopic,
  getTopics,
  updateTopic,
} from "./topics.service";

const topicsRouter = Router();

topicsRouter.get("/", getTopics);
topicsRouter.post("/", createTopic);
topicsRouter.put("/:id", updateTopic);
topicsRouter.delete("/:id", deleteTopic);

export { topicsRouter };
