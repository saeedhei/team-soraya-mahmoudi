import { Arg, Authorized, Ctx, Mutation, Resolver, Query } from 'type-graphql';
import { Appointment, AppointmentModel } from '../entity/appointment.entity';
import { AppointmentStatus } from '../types/enums';
import { User } from '../../user/entity/user.entity';
import { AppContext } from '../../../types/context';
import { CreateAppointmentInput } from '../types/appointment.types';
import { Service } from 'typedi';

@Service()
@Resolver(() => Appointment)
export class AppointmentResolver {
  @Authorized()
  @Mutation(() => Appointment)
  async confirmAppointment(@Arg('appointmentId') appointmentId: string): Promise<Appointment> {
    const appointment = await AppointmentModel.findById(appointmentId);
    if (!appointment) throw new Error('Appointment not found');

    appointment.status = AppointmentStatus.CONFIRMED;
    await appointment.save();
    return appointment;
  }

  @Authorized()
  @Mutation(() => Appointment)
  async createAppointment(
    @Arg('input') input: CreateAppointmentInput,
    @Ctx() ctx: AppContext,
  ): Promise<Appointment> {
    const user = ctx.user as User;
    if (!user) throw new Error('Unauthorized');

    const newAppointment = new AppointmentModel({
      doctor: input.doctorId,
      patient: user.id,
      date: input.date,
      time: input.time,
      notes: input.notes,
    });

    await newAppointment.save();
    return newAppointment;
  }
  @Authorized()
  @Query(() => [Appointment])
  async getAppointmentsForDoctor(@Ctx() ctx: AppContext): Promise<Appointment[]> {
    const user = ctx.user as User;

    if (!user || user.role !== 'doctor') {
      throw new Error('Unauthorized');
    }

    console.log('🧠 Fetching appointments for doctor:', user.id);
    return AppointmentModel.find({ doctor: user.id});
  }
}
