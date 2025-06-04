import { Request,Response } from "express";
import  jwt  from "jsonwebtoken";
import {User} from '../models/user.model';

export const verifyAccountHandler= async (req:Request, res:Response)=>{
    const token= req.query.token as string;

    if(!token ){
        return res.status(400).json({message: 'Verification token is missing'});
    }

    try{
        const payload= jwt.verify(token, process.env.JWT_SECRET!)as {id:string};

        const user= await User.findById(payload.id);
        if(!user){
            return res.status(404).json({message:'User not found' });
        }

        if (user.isVerified){
            return res.status(200).json({ message: 'Your account is already verified.' });
        }
        
        user.isVerified=true;
        await user.save();

        return res.status(200).json({ message: '✅ Account verified successfully!' });

    }catch{
        return  res.status(400).json({ message: 'Invalid or expired token' });
    }
    
}