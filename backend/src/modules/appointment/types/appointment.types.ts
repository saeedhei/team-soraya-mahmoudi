// src/modules/appointment/types/appointment.types.ts
import { InputType, Field, ID } from 'type-graphql';

@InputType()
export class CreateAppointmentInput {
  @Field(() => ID)
  doctorId!: string;

  @Field()
  date!: string;

  @Field()
  time!: string;

  @Field({ nullable: true })
  notes?: string;
}
