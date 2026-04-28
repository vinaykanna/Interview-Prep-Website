"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.commonRouter = void 0;
const express_1 = require("express");
const common_service_1 = require("./common.service");
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
const upload = (0, multer_1.default)({
    dest: path_1.default.join(__dirname, "..", "static"),
});
const commonRouter = (0, express_1.Router)();
exports.commonRouter = commonRouter;
commonRouter.get("/search", common_service_1.searchTopicsAndQuestions);
commonRouter.post("/upload", upload.single("file"), common_service_1.uploadAsset);
commonRouter.get("/static/:file", common_service_1.getAsset);
//# sourceMappingURL=common.controller.js.map