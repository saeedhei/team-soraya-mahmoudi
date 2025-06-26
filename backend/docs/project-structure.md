// ✅ A Complete, Modern Login System (2025 style) using:
// Express + Apollo Server v4 + TypeGraphQL + TypeDI + MongoDB + Passport-JWT + Nodemailer

// ------- Folder Structure -------
// src/
// ├── app.ts                  # Express server setup
// ├── core/
// │   ├── apollo/server.ts    # Apollo Server init
// │   ├── database/mongo.ts   # MongoDB connection
// │   └── utils/auth.ts       # JWT helper functions
// ├── modules/user/
// │   ├── entities/user.entity.ts
// │   ├── resolvers/user.resolver.ts
// │   ├── services/user.service.ts
// │   ├── services/auth.service.ts
// │   └── types/user.types.ts
// └── index.ts                # Entrypoint

// --------- STEP 1: user.entity.ts ---------
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

  @Property({ required: true })
  password!: string;

  @Field()
  @Property({ default: false })
  isVerified!: boolean;
}

export const UserModel = getModelForClass(User);

// --------- STEP 2: user.types.ts ---------
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

// --------- STEP 3: auth.ts (JWT utils) ---------
// src/core/utils/auth.ts
import jwt from 'jsonwebtoken';
const JWT_SECRET = process.env.JWT_SECRET || 'dev_secret';

export const signToken = (payload: object): string => {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: '7d' });
};

export const verifyToken = (token: string) => {
  return jwt.verify(token, JWT_SECRET);
};

// --------- STEP 4: auth.service.ts ---------
// src/modules/user/services/auth.service.ts

import bcrypt from 'bcrypt';
import { Service } from 'typedi';
import { UserModel } from '../entity/user.entity';
import { signToken } from '../../../core/utils/auth';
import crypto from 'crypto';
import { transporter } from '../../../core/utils/mailer';

@Service()
export class AuthService {
  async register(email: string, password: string) {
    const hashed = await bcrypt.hash(password, 10);

    // Generate verification token
    const verifyToken = crypto.randomBytes(32).toString('hex');
    const verifyTokenExpiry = new Date(Date.now() + 1000 * 60 * 60); // 1 hour

    const user = new UserModel({
      email,
      password: hashed,
      verifyToken,
      verifyTokenExpiry,
    });

    await user.save();

    // Send verification email
    const verificationLink = `http://localhost:4000/verify-email?token=${verifyToken}&email=${email}`;

    await transporter.sendMail({
      from: '"My App" <no-reply@myapp.com>',
      to: email,
      subject: 'Verify your email',
      html: `Please click <a href="${verificationLink}">this link</a> to verify your email.`,
    });

    return user;
  }

  async login(email: string, password: string) {
    const user = await UserModel.findOne({ email });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new Error('Invalid credentials');
    }

    if (!user.isVerified) {
      throw new Error('Please verify your email');
    }

    return signToken({ id: user._id });
  }
}

// --------- STEP 5: user.service.ts ---------
// src/modules/user/services/user.service.ts
import { Service } from 'typedi';
import { UserModel } from '../entity/user.entity';

@Service()
export class UserService {
  async getUserById(id: string) {
    return UserModel.findById(id);
  }

  async verifyUserEmail(id: string) {
    return UserModel.findByIdAndUpdate(id, { isVerified: true }, { new: true });
  }
}

// --------- STEP 6: user.resolver.ts ---------
// src/modules/user/resolvers/user.resolver.ts
import { Resolver, Mutation, Arg, Ctx, Query } from 'type-graphql';
import { Inject, Service } from 'typedi';
import { AuthService } from '../services/auth.service';
import { RegisterInput, LoginInput } from '../types/user.types';
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
    return this.authService.register(data.email, data.password);
  }

  @Mutation(() => String)
  async login(@Arg('data') data: LoginInput) {
    return this.authService.login(data.email, data.password);
  }

  @Query(() => User, { nullable: true })
  async me(@Ctx() ctx: any) {
    const userId = ctx.user?.id;
    return this.userService.getUserById(userId);
  }
}

// --------- STEP 7: apollo server.ts ---------
// src/core/apollo/server.ts
import { buildSchema } from 'type-graphql';
import { ApolloServer } from '@apollo/server';
import { UserResolver } from '../../modules/user/resolvers/user.resolver';
import { Container } from 'typedi';

export async function createApolloServer() {
  const schema = await buildSchema({
    resolvers: [UserResolver],
    container: Container,
  });
  return new ApolloServer({ schema });
}

// --------- STEP 8: mongo.ts ---------
// src/core/database/mongo.ts
import mongoose from 'mongoose';

export async function connectToMongoDB() {
  const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017/mydb';
  await mongoose.connect(uri);
  console.log('🟢 Connected to MongoDB');
}

// --------- STEP 9: app.ts ---------
// src/app.ts
import express, { Request } from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { expressMiddleware } from '@apollo/server/express4';
import { createApolloServer } from './core/apollo/server';

import passport from 'passport';
import './core/passport/jwt.strategy';

import { User } from './modules/user/entity/user.entity';

import { transporter } from './utils/mailer';

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(passport.initialize());

export async function setupApollo() {
  const server = await createApolloServer();
  await server.start();

  app.use(
    '/graphql',
    expressMiddleware(server, {
      context: async ({ req }: { req: Request }) =>
        new Promise((resolve, reject) => {
          passport.authenticate('jwt', { session: false }, (err: unknown, user: User | false) => {
            if (err) return reject(err);
            resolve({ user: user || null });
          })(req);
        }),
    }),
  );

  return app;
}

// --------- STEP 10: server.ts ---------
// src/server.ts
import dotenv from 'dotenv';
dotenv.config({ path: '.env.development' });
import { validateEnv } from './utils/validateEnv';
validateEnv();
import { connectToMongoDB } from './core/database/mongo';
import { setupApollo } from './app';

const PORT = process.env.PORT;

async function startServer() {
  try {
    await connectToMongoDB();
    const app = await setupApollo();

    app.listen(PORT, () => {
      console.log(`🚀 Server ready at http://localhost:${PORT}/graphql`);
      console.log(`🚀 Server ready at http://localhost:${PORT}/health`);
    });
  } catch (error) {
    console.error('❌ Failed to start server:', error);
    process.exit(1);
  }
}

startServer();