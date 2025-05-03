import { Request,Response } from "express";
import  jwt  from "jsonwebtoken";
import {User} from '../models/user.model';

export const verifyAccountHandler= async (req:Request, res:Response)=>{
    const {token}= req.query;

    if(!token || typeof token!== 'string'){
        return res.status(400).send('Invalid or missing token');
    }

    try{
        const decoded= jwt.verify(token, process.env.JWT_SECRET!)as {id:string};

        const user= await User.findById(decoded.id);
        if(!user){
            return res.status(404).send('USER not found');
        }

        if (user.isVerified){
            return res.send('Your account is already verified.')
        }
        
        user.isVerified=true;
        await user.save();

        return res.send('✅ Your account has been successfully verified!');

    }catch(error){
        return  res.status(400).send('Invalid or expired token');
    }
    
}