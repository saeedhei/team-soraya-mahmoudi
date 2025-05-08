import { Schema,model } from "mongoose";

const userSchema=new Schema({
    username:{type:String, required:true, unique:true},
    email:{type:String, required:true, unique:true, lowercase:true, trim: true},
    password:{type:String, required:true},
    isVerified:{type:Boolean, default:false},
},
{timestamps:true}
);

export const User= model('User',userSchema);