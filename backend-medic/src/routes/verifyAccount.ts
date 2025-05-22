import express from 'express';
import { verifyAccountHandler } from '../domain/users/controllers/verifyAccountHandler';

const router=express.Router();

router.get('/verify',verifyAccountHandler);
export default router;