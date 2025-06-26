import { transporter } from '../../../utils/mailer';

export const sendVerificationEmail = async (email: string, token: string) => {
  const verificationUrl = `http://localhost:3000/verify?token=${token}`;

  const mailOptions = {
    from: 'Medic App <no-reply@medic.com>',
    to: email,
    subject: 'Verify Your Account',
    html: `
      <p>Please click the button below to verify your account:</p>
      <a href="${verificationUrl}">${verificationUrl}</a>
      <p>If you did not create an account, please ignore this email.</p>
    `,
  };

  await transporter.sendMail(mailOptions);
};
