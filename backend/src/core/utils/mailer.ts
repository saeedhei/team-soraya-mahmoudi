import nodemailer from 'nodemailer';

export const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT),
  secure: process.env.SMTP_SECURE === 'true',
  ignoreTLS: process.env.SMTP_IGNORE_TLS === 'true',
  auth: {
    user: process.env.SMTP_USER || '',
    pass: process.env.SMTP_PASS || '',
  },
});
// export const transporter = nodemailer.createTransport({
//   host: '127.0.0.1', 
//   port: 1025,
//   secure: false,
// });
