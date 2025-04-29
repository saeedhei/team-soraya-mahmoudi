import { User } from '../../domain/users/models/user.model'; 
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
const SECRET = process.env.JWT_SECRET || 'myverysecretkey';

export const userResolvers= {
    Query: {
        me: async (_: any, __: any, context: any) => {
            if (!context.user) throw new Error('Not authenticated');
            return context.user;
          },
    },
    Mutation:{
        signup: async (_:any, args:{username:string, email:string, password:string})=>{
            const { username,email,password}= args;
            

     // ۱. هش کردن پسورد
      const hashedPassword = await bcrypt.hash(password, 10);

      // ۲. ساخت کاربر جدید
      const user = await User.create({
        username,
        email,
        password: hashedPassword,
      });
      
      const token = jwt.sign({ id: user.id }, SECRET, { expiresIn: '7d' });

      // ۳. برگردوندن نتیجه
      return {
        token,
        user,
      };
    },
  },
};