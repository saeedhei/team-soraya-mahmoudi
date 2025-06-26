// src/modules/user/routes/verify.route.ts
import { Router } from 'express';
import { UserModel } from '../entity/user.entity';

const router = Router();

router.get('/verify-email', async (req, res) => {
  const { token, email } = req.query;

  if (!token || !email) {
    return res.status(400).send('Missing token or email.');
  }

  const user = await UserModel.findOne({ email, verifyToken: token });

  if (!user || user.verifyTokenExpiry! < new Date()) {
    return res.status(400).send('Invalid or expired token.');
  }

  user.isVerified = true;
  user.verifyToken = undefined;
  user.verifyTokenExpiry = undefined;
  await user.save();

  res.send('✅ Email verified successfully. You can now login.');
});

export default router;
