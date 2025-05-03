import { User } from '../../domain/users/models/user.model'; 
import { signupSchema } from '../../domain/users/validation/userValidation';
import { sendVerificationEmail } from '../../utils/sendVerificationEmail';
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
      //Step 1: Validate input data
      const validatedData=signupSchema.parse(args);
      const {username, email, password}= validatedData;
            
      //Step2: Check is already in use
      const existingUser= await User.findOne({email});
      if(existingUser){
        throw new Error('Email is already in use')
      }
     //Step3: hashedPassword
      const hashedPassword = await bcrypt.hash(password, 10);

      //Step4: create new user
      const user = await User.create({
        username,
        email,
        password: hashedPassword,
      });

      //Step5: Create verification token (valid for 1 hour)
      const verificationToken= jwt.sign(
        {id:user._id},
        process.env.JWT_SECRET!,
        {expiresIn:'1h'}
      )

      //Step6: Send verification email
      await sendVerificationEmail(user.email,verificationToken)
      
      //Step7: Create login token(valid for 7days)
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