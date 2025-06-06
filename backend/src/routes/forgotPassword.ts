import express from 'express';
import { forgotPasswordHandler } from '../modules/user/controllers/forgotPasswordHandler';

const router = express.Router();

router.post('/forgot-password', forgotPasswordHandler);
export default router;
