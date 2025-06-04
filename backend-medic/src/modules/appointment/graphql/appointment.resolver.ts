/* eslint-disable @typescript-eslint/no-explicit-any */
import { Appointment } from "../models/appointment.model";

export const appointmentResolvers = {
  Mutation: {
    confirmAppointment: async (
      _: unknown,
      { appointmentId }: { appointmentId: string },
      context: { user: any }

    ) => {
      const currentUser = context.user;
      if (!currentUser) {
        throw new Error("Unauthorized");
      }
      
      const appointment = await Appointment.findById(appointmentId);
      if (!appointment) {
        throw new Error("Appointment not found");
      }

      appointment.status = "confirmed";
      await appointment.save();
      return appointment;
    },
  },
};
