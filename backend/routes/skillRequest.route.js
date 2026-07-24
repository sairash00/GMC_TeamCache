import { Router } from "express";

import {
  createSkillRequest,
  getAllSkillRequests,
  upvoteSkillRequest,
  downvoteSkillRequest,
  deleteSkillRequest,
} from "../controllers/skillRequest.controller.js";

import verifyJWT from "../middlewares/auth.middleware.js";
import validate from "../middlewares/validate.middleware.js";

import { createSkillRequestSchema } from "../validators/skillRequest.validator.js";

const router = Router();

// Create Skill Request

router.post(
  "/",
  verifyJWT,
  validate(createSkillRequestSchema),
  createSkillRequest,
);

// Get All Skill Requests

router.get("/", getAllSkillRequests);

// Upvote

router.patch("/:id/upvote", verifyJWT, upvoteSkillRequest);

// Downvote

router.patch("/:id/downvote", verifyJWT, downvoteSkillRequest);

// Delete

router.delete("/:id", verifyJWT, deleteSkillRequest);

export default router;
