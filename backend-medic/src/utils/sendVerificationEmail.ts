import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host:'localhost',
  port:1025,
  secure:false,
  ignoreTLS:true
});

export const sendVerificationEmail=async(email:string, token:string)=>{
const verificationUrl=`http://localhost:3000/verify?token=${token}`;
 
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