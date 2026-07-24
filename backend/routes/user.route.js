import { Router } from "express";

import { getProfile, getUnlockedPremiumVideos, increaseCredits, uploadAvatar } from "../controllers/user.controller.js";

import verifyJWT from "../middlewares/auth.middleware.js";
import upload from "../middlewares/upload.middleware.js";

const router = Router();

router.get("/me", verifyJWT, getProfile);
router.patch("/avatar", verifyJWT, upload.single("avatar"), uploadAvatar);
router.patch("/credits", verifyJWT, increaseCredits);
router.get("/getPremiumVideos", verifyJWT, getUnlockedPremiumVideos);

export default router;
 