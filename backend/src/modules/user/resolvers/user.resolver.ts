// src/modules/user/resolvers/user.resolver.ts
import { Resolver, Mutation, Arg, Ctx, Query } from 'type-graphql';
import { Inject, Service } from 'typedi';
import { AuthService } from '../services/auth.service';
import { RegisterInput, LoginInput , ResetPasswordInput} from '../types/user.types';
import { User } from '../entity/user.entity';
import { UserService } from '../services/user.service';
@Resolver()
@Service()
export class UserResolver {
  constructor(
    @Inject() private authService: AuthService,
    @Inject() private userService: UserService,
  ) {}

  @Mutation(() => User)
  async register(@Arg('data') data: RegisterInput) {
    return this.authService.register(data.email, data.password,data.role);
  }

  @Mutation(() => String)
  async login(@Arg('data') data: LoginInput) {
    return this.authService.login(data.email, data.password);
  }

  @Mutation(() => Boolean)
  async forgotPassword(@Arg('email') email: string) {
    return this.authService.forgotPassword(email);
  }

  @Mutation(() => Boolean)
  async resetPassword(@Arg('data') data: ResetPasswordInput) {
    return this.authService.resetPassword(data.email, data.token, data.newPassword);
  }

  @Query(() => User, { nullable: true })
  async me(@Ctx() ctx: any) {
    const userId = ctx.user?.id;
    return this.userService.getUserById(userId);
  }
}
