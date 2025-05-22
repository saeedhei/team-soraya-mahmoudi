import {Request, Response} from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { User } from "../models/user.model";

export const resetPasswordHandler = async (req: Request, res: Response) =>{
    const { token, newPassword } = req.body;

    if (!token || !newPassword) {
        return res.status(400).json({ message: "Token and new password are required" });
      }

    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { id: string };
        const user = await User.findById(decoded.id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
          }

        const hashedPassword = await bcrypt.hash(newPassword, 10);
        user.password = hashedPassword;
        await user.save();
        return res.status(200).json({ message: "Password has been reset successfully" });

    }catch(error){
        return res.status(400).json({ message: "Invalid or expired token" });
    }
}