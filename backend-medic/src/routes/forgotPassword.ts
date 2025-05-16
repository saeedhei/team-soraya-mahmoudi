import express from "express";
import {forgotPasswordHandler} from "../domain/users/controllers/forgotPasswordHandler";

const router =express.Router();

router.post("/forgot-password", forgotPasswordHandler);
export default router;