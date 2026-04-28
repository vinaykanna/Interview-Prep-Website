import { Router } from "express";
import {
  getAsset,
  searchTopicsAndQuestions,
  uploadAsset,
} from "./common.service";
import multer from "multer";
import path from "path";

const upload = multer({
  dest: path.join(__dirname, "..", "static"),
});

const commonRouter = Router();

commonRouter.get("/search", searchTopicsAndQuestions);
commonRouter.post("/upload", upload.single("file"), uploadAsset);
commonRouter.get("/static/:file", getAsset);

export { commonRouter };
