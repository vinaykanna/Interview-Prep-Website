"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.topicsRouter = void 0;
const express_1 = require("express");
const topics_service_1 = require("./topics.service");
const topicsRouter = (0, express_1.Router)();
exports.topicsRouter = topicsRouter;
topicsRouter.get("/", topics_service_1.getTopics);
topicsRouter.post("/", topics_service_1.createTopic);
topicsRouter.put("/:id", topics_service_1.updateTopic);
topicsRouter.delete("/:id", topics_service_1.deleteTopic);
//# sourceMappingURL=topics.controller.js.map