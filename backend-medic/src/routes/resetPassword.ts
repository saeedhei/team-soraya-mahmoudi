import express from "express";
import { resetPasswordHandler } from "../domain/users/controllers/resetPasswordHandler";

const router = express.Router();

router.post("/reset-password", resetPasswordHandler);

export default router;