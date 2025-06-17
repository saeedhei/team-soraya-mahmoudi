import { Appointment } from '../models/appointment.model';

export const appointmentResolvers = {
  Mutation: {
    confirmAppointment: async (_: any, { appointmentId }: { appointmentId: string }) => {
      const appointment = await Appointment.findById(appointmentId);
      if (!appointment) {
        throw new Error('Appointment not found');
      }

      appointment.status = 'confirmed';
      await appointment.save();
      return appointment;
    },
    createAppointment: async (
      _: any,
      { input }: { input: { doctorId: string; date: string; notes?: string } },
      context: any,
    ) => {
      const user = context?.user;
      if (!user) {
        return {
          userErrors: [{ message: 'Unauthorized' }],
          appointment: null,
        };
      }

      const { doctorId, date, notes } = input;

      if (!doctorId || !date) {
        return {
          userErrors: [{ message: 'Doctor and date are required.' }],
          appointment: null,
        };
      }

      const newAppointment = new Appointment({
        doctor: doctorId,
        patient: user.id,
        date,
        notes,
        status: 'pending',
      });

      await newAppointment.save();
      return {
        userErrors: [],
        appointment: newAppointment,
      };
    },
  },
};
