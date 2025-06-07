import {Appointment} from "../models/appointment.model";

export const appointmentResolvers={
    Mutation: {
        confirmAppointment: async(_:any, {appointmentId}: {appointmentId: string})=>{
            const appointment= await Appointment.findById(appointmentId);
            if(!appointment){
                throw new Error("Appointment not found");
            }

            appointment.status= "confirmed";
            await appointment.save();
            return appointment;
        },
    },
};