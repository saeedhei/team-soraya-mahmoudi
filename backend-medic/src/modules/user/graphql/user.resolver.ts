import { User } from '../models/user.model';
import { signupSchema } from '../validation/userValidation';
import { sendPasswordResetEmail } from '../utils/sendPasswordResetEmail';
import { sendVerificationEmail } from '../utils/sendVerificationEmail';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const SECRET = process.env.JWT_SECRET || 'myverysecretkey';

export const userResolvers = {
  Query: {
    me: async (_: any, __: any, context: any) => {
      if (!context.user) throw new Error('Not authenticated');
      return context.user;
    },
  },

  Mutation: {
    signup: async (
      _: any,
      args: {
        username: string;
        email: string;
        password: string;
        role: 'patient' | 'doctor';
      }
    ) => {
      try {
        const validatedData = signupSchema.parse(args);
        const { username, email, password, role } = validatedData;

        const existingUser = await User.findOne({ email });
        if (existingUser) throw new Error('Email is already in use');

        const existingUsername = await User.findOne({ username });
        if (existingUsername) throw new Error('Username is already in use');

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
          username,
          email,
          password: hashedPassword,
          role,
        });

        const verificationToken = jwt.sign(
          { id: user._id },
          process.env.JWT_SECRET!,
          { expiresIn: '1h' }
        );

        await sendVerificationEmail(user.email, verificationToken);

        const token = jwt.sign({ id: user.id }, SECRET, {
          expiresIn: '7d',
        });

        return {
          token,
          user,
        };
      } catch (error) {
        console.error('Signup resolver error:', error);
        throw error;
      }
    },

    login: async (_: any, args: { email: string; password: string }) => {
      const { email, password } = args;

      const user = await User.findOne({ email });
      if (!user) throw new Error('Invalid credentials');

      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) throw new Error('Invalid credentials');

      const token = jwt.sign({ id: user.id }, SECRET, {
        expiresIn: '7d',
      });

      return {
        token,
        user,
      };
    },

    forgotPassword: async (_: any, args: { email: string }) => {
      const { email } = args;

      const user = await User.findOne({ email });
      if (!user) throw new Error('User with this email does not exist');

      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET!, {
        expiresIn: '1h',
      });

      await sendPasswordResetEmail(user.email, token);
      return 'Password reset email sent!';
    },
  },
};
