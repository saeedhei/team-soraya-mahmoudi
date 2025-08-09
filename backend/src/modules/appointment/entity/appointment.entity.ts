import { getModelForClass, prop, Ref } from '@typegoose/typegoose';
import { Field, ID, ObjectType} from 'type-graphql';
import { User } from '../../user/entity/user.entity'
import { AppointmentStatus } from '../types/enums';

@ObjectType()
export class Appointment {
  @Field(() => ID,{name: '_id'})
  readonly id!: string;

  @Field(() => User)
  @prop({ ref: () => User, required: true })
  doctor!: Ref<User>;

  @Field(() => User)
  @prop({ ref: () => User, required: true })
  patient!: Ref<User>;

  @Field()
  @prop({ required: true })
  date!: Date;

  @Field()
  @prop({ required: true })
  time!: string;

  @Field({ nullable: true })
  @prop()
  notes?: string;

  @Field(() => AppointmentStatus)
  @prop({ enum: AppointmentStatus, default: AppointmentStatus.PENDING })
  status!: AppointmentStatus;

  @Field()
  readonly createdAt!: Date;

  @Field()
  readonly updatedAt!: Date;
}

export const AppointmentModel = getModelForClass(Appointment, {
  schemaOptions: { timestamps: true },
});
