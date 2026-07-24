import express from "express";

import {
  register,
  login,
  logout,
  getProfile,
} from "../controllers/auth.controller.js";

import validate from "../middlewares/validate.middleware.js";
import auth from "../middlewares/auth.middleware.js";

import { registerSchema, loginSchema } from "../validators/auth.validator.js";

const router = express.Router();

router.post("/register", validate(registerSchema), register);

router.post("/login", validate(loginSchema), login);

router.post("/logout", auth, logout);

router.get("/profile", auth, getProfile);

export default router;
