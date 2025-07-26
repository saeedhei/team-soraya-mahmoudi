import { Arg, Authorized, Ctx, Mutation, Resolver } from 'type-graphql';
import { Appointment, AppointmentModel, AppointmentStatus } from '../entity/appointment.entity';
import { User } from '../../user/entity/user.entity';
import { AppContext } from '../../../types/context';

@Resolver(() => Appointment)
export class AppointmentResolver {
  @Authorized()
  @Mutation(() => Appointment)
  async confirmAppointment(
    @Arg('appointmentId') appointmentId: string
  ): Promise<Appointment> {
    const appointment = await AppointmentModel.findById(appointmentId);
    if (!appointment) throw new Error('Appointment not found');

    appointment.status = AppointmentStatus.CONFIRMED;
    await appointment.save();
    return appointment;
  }

  @Authorized()
  @Mutation(() => Appointment)
  async createAppointment(
    @Arg('doctorId') doctorId: string,
    @Arg('date') date: Date,
    @Arg('time') time: string,
    @Arg('notes', { nullable: true }) notes: string,
    @Ctx() ctx: AppContext
  ): Promise<Appointment> {
    const user = ctx.user as User;
    if (!user) throw new Error('Unauthorized');

    const newAppointment = new AppointmentModel({
      doctor: doctorId,
      patient: user._id,
      date,
      time,
      notes,
    });

    await newAppointment.save();
    return newAppointment;
  }
}
