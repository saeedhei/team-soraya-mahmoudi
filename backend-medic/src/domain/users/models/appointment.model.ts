import {Schema, model} from "mongoose";

const appointmentSchema = new Schema(
    {
        doctor:{ type: Schema.Types.ObjectId, ref: 'User', required: true},
        patient:{type: Schema.Types.ObjectId, ref: 'User', required: true},
        data:{type: Date, required: true},
        status:{type: String, enum: ['pending', 'confirmed', 'cancelled'], default: 'pending'},
    },
    {timestamps:true}
);
export const Appointment= model("Appointment", appointmentSchema);