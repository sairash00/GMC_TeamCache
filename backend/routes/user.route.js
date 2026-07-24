import express from "express";

import { uploadAvatar } from "../controllers/user.controller.js";

import auth from "../middlewares/auth.middleware.js";
import upload from "../middlewares/upload.middleware.js";

const router = express.Router();

router.patch("/avatar", auth, upload.single("avatar"), uploadAvatar);

export default router;
