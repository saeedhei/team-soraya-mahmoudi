// src/modules/user/entities/user.entity.ts
import { ObjectType, Field, ID } from 'type-graphql';
import { prop as Property, getModelForClass } from '@typegoose/typegoose';

@ObjectType()
export class User {
  @Field(() => ID)
  readonly _id!: string;

  @Field()
  @Property({ required: true, unique: true })
  email!: string;

  @Field()
  @Property({ required: true })
  password!: string;

  @Field()
  @Property({ enum: ['patient', 'doctor'], required: true })
  role!: 'patient' | 'doctor';

  @Field()
  @Property({ default: false })
  isVerified!: boolean;

  @Property()
  verifyToken?: string;

  @Property()
  verifyTokenExpiry?: Date;

  @Property()
  resetToken?: string;

  @Property()
  resetTokenExpiry?: Date;
  @Field({ nullable: true })
  @Property()
  firstName?: string;

  @Field({ nullable: true })
  @Property()
  lastName?: string;
}

export const UserModel = getModelForClass(User);
