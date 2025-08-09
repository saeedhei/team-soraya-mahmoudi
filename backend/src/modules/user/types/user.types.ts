// src/modules/user/types/user.types.ts
import { InputType, ObjectType, Field } from 'type-graphql';
@InputType()
export class RegisterInput {
  @Field() email!: string;
  @Field() password!: string;
  @Field()
  role!: 'patient' | 'doctor';
}

@InputType()
export class LoginInput {
  @Field() email!: string;
  @Field() password!: string;
}

@InputType()
export class ResetPasswordInput {
  @Field() email!: string;
  @Field() token!: string;
  @Field() newPassword!: string;
}

@ObjectType()
export class PublicUser {
  @Field()
  _id!: string;

  @Field()
  email!: string;

  @Field()
  role!: 'patient' | 'doctor';

  @Field()
  isVerified!: boolean;

  @Field({ nullable: true })
  firstName?: string;

  @Field({ nullable: true })
  lastName?: string;
}


@ObjectType()
export class LoginResponse {
  @Field()
  token!: string;

  @Field(() => PublicUser)
  user!: PublicUser;
}