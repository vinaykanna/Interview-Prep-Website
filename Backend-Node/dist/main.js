"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const common_controller_1 = require("./common/common.controller");
const questions_controller_1 = require("./questions/questions.controller");
const topics_controller_1 = require("./topics/topics.controller");
const app = (0, express_1.default)();
const PORT = 4000;
// Middleware
app.use((0, cors_1.default)());
app.use(express_1.default.json());
// Routes
app.use("/topics", topics_controller_1.topicsRouter);
app.use("/questions", questions_controller_1.questionsRouter);
app.use("/common", common_controller_1.commonRouter);
// 404 fallback
app.use((_req, res) => {
    res.status(404).json({ message: "Route Not Found" });
});
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
//# sourceMappingURL=main.js.map