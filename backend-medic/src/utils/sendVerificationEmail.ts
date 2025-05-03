import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
    service:'Gmail',
    auth:{
        user:process.env.EMAIL_User,
        pass: process.env.EMAIL_PASS,
    }
});

export const sendVerificationEmail=async(email:string, token:string)=>{
const verificationUrl=`http://localhost:3333/verify?token=${token}`;
 
const mailOptions={
    from: 'Medic App <no-reply@medic.com>',
    to:email,
    subject:'verify your account',
    html:`
    <p>Please click the link below to verify your account:</p>
    <a href="${verificationUrl}">${verificationUrl}</a>
  `,    
};

await transporter.sendMail(mailOptions);
};