import {Schema, model, Types} from 'mongoose';

const verificationTokenSchema =new Schema({
    userId:{
       type: Types.ObjectId,
       requied:true,
       ref:'User'
    },
    token:{
        type:String, required:true
    },
    expiresAt:{
        type:DataTransfer,
        required:true
    }
});

export const verificationToken= model('VerificationToken',verificationTokenSchema)