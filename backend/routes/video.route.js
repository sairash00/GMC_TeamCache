import { Router } from "express";

import { 
  uploadVideo,
  getAllVideos,
  getVideoById,
  unlockPremiumVideo,
  deleteVideo,
} from "../controllers/video.controller.js";

import verifyJWT from "../middlewares/auth.middleware.js";
import upload from "../middlewares/upload.middleware.js";

const router = Router();

router.post(
  "/",
  verifyJWT,
  upload.fields([
    {
      name: "thumbnail",
      maxCount: 1,
    },
    {
      name: "video",
      maxCount: 1,
    },
  ]),
  uploadVideo,
);

router.get("/", getAllVideos);

router.get("/:id", getVideoById);

router.post("/:id/unlock", verifyJWT, unlockPremiumVideo);

router.delete("/:id", verifyJWT, deleteVideo);

export default router;
