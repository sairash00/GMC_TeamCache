import { Router } from "express";

import { getProfile, uploadAvatar } from "../controllers/user.controller.js";

import verifyJWT from "../middlewares/auth.middleware.js";
import upload from "../middlewares/multer.middleware.js";

const router = Router();

router.get("/me", verifyJWT, getProfile);
router.patch("/avatar", verifyJWT, upload.single("avatar"), uploadAvatar);

export default router;
