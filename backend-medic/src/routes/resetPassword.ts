import express from "express";
import { resetPasswordHandler } from "../modules/user/controllers/resetPasswordHandler";

const router = express.Router();

router.post("/reset-password", resetPasswordHandler);

export default router;
