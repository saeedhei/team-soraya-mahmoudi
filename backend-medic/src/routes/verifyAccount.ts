import express from 'express';
import jwt from 'jsonwebtoken';
import {User} from '../domain/users/models/user.model';

const router=express.Router();
router.get('/verify-account',async(req,res)=>{
    const token= req.query.token as string;
    if(!token){
        return res.status(400).send('Verification token is missing');}
    try{
    const payload=jwt.verify(token,process.env.JWT_SECRET!) as {id:string};
    const user=await User.findById(payload.id);
    if(!user){
        return res.status(404).send('User not found');
    }
    user.isVerified=true;
    await user.save();
    return res.send('✅ Account verified successfully!')
}catch(err){
    return res.status(400).send('Invalid or expired token')
}
});
export default router;