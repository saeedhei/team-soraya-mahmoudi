import nodemailer from 'nodemailer';

const transporter= nodemailer.createTransport({
    service:'Gmail',
    auth:{
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

export const sendPasswordResetEmail=async (email:string, token:string)=>{
    const resetUrl='http://localhost:3000/reset-password?token=${token}';
    const mailOptions={
        from: '"Medic App" <no-reply@medic.com>',
        to:email,
        subject:'Reset your password',
        html: `
        <p>You requested to reset your password.</p>
        <p>Click the link below to reset it:</p>
        <a href="${resetUrl}">${resetUrl}</a>
        <p>If you didn’t request this, just ignore this email.</p>
      `,
    }
    await transporter.sendMail(mailOptions);
}