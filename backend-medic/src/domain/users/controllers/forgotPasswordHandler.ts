import {User} from "../models/user.model"
import { sendPasswordResetEmail } from "../../../utils/sendPasswordResetEmail";
import jwt from 'jsonwebtoken';
import { Request, Response } from 'express';

export const forgotPasswordHandler=async(req:Request, res:Response)=>{
    const {email}=req.body;

    if (!email) {
        return res.status(400).json({ message: 'Email is required' });
      }
  
    const user= await User.findOne({email});
    if(!user){
        return res.status(200).send("If this email exists, a reset link has been sent.")
    }

    const resetToken= jwt.sign({id:user._id}, process.env.JWT_SECRET!,{expiresIn: '1h'});
    await sendPasswordResetEmail(user.email, resetToken);
    return res.status(200).json({ message: 'Password reset email sent!' });
}