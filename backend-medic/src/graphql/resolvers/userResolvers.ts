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
            

     // hashedPassword
      const hashedPassword = await bcrypt.hash(password, 10);

      // create new user
      const user = await User.create({
        username,
        email,
        password: hashedPassword,
      });
      
      const token = jwt.sign({ id: user.id }, SECRET, { expiresIn: '7d' });

      // result
      return {
        token,
        user,
      };
    },

    //login mutation
    login: async(_:any, args: {email:string; password:string})=>{
      const {email, password}=args;

      const user=await User.findOne({email});
      if(!user){
        throw new Error('Invalid credentials');
      }

      const isPasswordValid= await bcrypt.compare(password,user.password);
      if(!isPasswordValid){
        throw new Error('Invalid credentials')
      } 

      const token= jwt.sign({ id:user.id}, SECRET, {expiresIn: '7d'});

      return{
        token,
        user,
      };
    }
  },
};