import {User} from "../models/user.model"
import { sendPasswordResetEmail } from "../../../utils/sendPasswordResetEmail";
import jwt from 'jsonwebtoken';
import { Request, Response } from 'express';

export const forgotPasswordHandler=async(req:Request, res:Response)=>{
    const {email}=req.body;

    const user= await User.findOne({email});
    if(!user){
        return res.status(404).send("User not found")
    }

    const resetToken= jwt.sign({id:user._id}, process.env.JWT_SECRET!,{expiresIn: '1h'});
    await sendPasswordResetEmail(user.email, resetToken);
    return res.send({ message: 'Password reset email sent!' });
}