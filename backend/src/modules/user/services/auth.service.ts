// src/modules/user/services/auth.service.ts

import bcrypt from 'bcrypt';
import { Service } from 'typedi';
import { UserModel } from '../entity/user.entity';
import { signToken } from '../../../core/utils/auth';
import crypto from 'crypto';
import { transporter } from '../../../core/utils/mailer';

@Service()
export class AuthService {
  async register(email: string, password: string) {
    const hashed = await bcrypt.hash(password, 10);

    // Generate verification token
    const verifyToken = crypto.randomBytes(32).toString('hex');
    const verifyTokenExpiry = new Date(Date.now() + 1000 * 60 * 60); // 1 hour

    const user = new UserModel({
      email,
      password: hashed,
      verifyToken,
      verifyTokenExpiry,
    });

    await user.save();

    // Send verification email
    const verificationLink = `http://localhost:3000/auth/verify-email?token=${verifyToken}&email=${email}`;

    await transporter.sendMail({
      from: '"My App" <no-reply@myapp.com>',
      to: email,
      subject: 'Verify your email',
      html: `Please click <a href="${verificationLink}">this link</a> to verify your email.`,
    });

    return user;
  }

  async login(email: string, password: string) {
    const user = await UserModel.findOne({ email });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new Error('Invalid credentials');
    }

    if (!user.isVerified) {
      throw new Error('Please verify your email');
    }

    return signToken({ id: user._id });
  }

  async forgotPassword(email: string) {
    const user = await UserModel.findOne({ email });
  
    if (!user) {
      throw new Error('User not found');
    }
  
    const resetToken = crypto.randomBytes(32).toString('hex');
    const resetTokenExpiry = new Date(Date.now() + 1000 * 60 * 60); // 1 hour
  
    user.resetToken = resetToken;
    user.resetTokenExpiry = resetTokenExpiry;
    await user.save();
  
    const resetLink = `http://localhost:5173/reset-password?token=${resetToken}&email=${email}`;
  
    await transporter.sendMail({
      from: '"My App" <no-reply@myapp.com>',
      to: email,
      subject: 'Reset your password',
      html: `Please click <a href="${resetLink}">this link</a> to reset your password.`,
    });
  
    return true;
  }

  async resetPassword(email: string, token: string, newPassword: string) {
    const user = await UserModel.findOne({
      email,
      resetToken: token,
      resetTokenExpiry: { $gt: new Date() },
    });
  
    if (!user) {
      throw new Error('Invalid or expired token');
    }
  
    const hashed = await bcrypt.hash(newPassword, 10);
  
    user.password = hashed;
    user.resetToken = undefined;
    user.resetTokenExpiry = undefined;
  
    await user.save();
  
    return true;
  }
  
  
}
