import express from 'express';
import { verifyAccountHandler } from '../modules/user/controllers/verifyAccountHandler';

const router=express.Router();

router.get('/verify',verifyAccountHandler);
export default router;