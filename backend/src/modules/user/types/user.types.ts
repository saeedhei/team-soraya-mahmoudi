// src/modules/user/types/user.types.ts
import { InputType, Field } from 'type-graphql';

@InputType()
export class RegisterInput {
  @Field() email!: string;
  @Field() password!: string;
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

