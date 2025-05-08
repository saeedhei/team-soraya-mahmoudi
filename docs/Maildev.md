# MailDev Setup for Local Email Testing

## Overview
MailDev is a tool for local email testing. It creates an SMTP server that can be used to intercept emails in your development environment. This is useful for testing email functionalities like account verification and password reset emails during development without actually sending emails to real users.

## Installation

To install MailDev globally, use the following command:

```bash
npm install -g maildev

Running MailDev
To start MailDev, run the following command in your terminal:
maildev
This will start the MailDev SMTP server on port 1025 and the web interface on port 1080.

You can access the web interface at:
http://localhost:1080
Here, you can view all the emails that are sent through the local SMTP server.

Configuring Nodemailer to Use MailDev
In your project, configure Nodemailer to use the MailDev SMTP server by setting the transport options to:
const transporter = nodemailer.createTransport({
  host: 'localhost',
  port: 1025,
  ignoreTLS: true
});

Sending a Test Email
After setting up MailDev and configuring Nodemailer, you can use the sendVerificationEmail function (or similar) to send test emails. These emails will be captured by MailDev and displayed in the web interface.
const sendVerificationEmail = async (email, token) => {
  const verificationLink = `http://localhost:3000/verify-email?token=${token}`;
  
  await transporter.sendMail({
    from: '"MyApp" <no-reply@myapp.com>',
    to: email,
    subject: 'Verify your email',
    html: `<p>Click <a href="${verificationLink}">here</a> to verify your email.</p>`
  });
};

Conclusion
MailDev is an excellent tool for testing email functionality locally, without sending emails to actual users. It makes development smoother by allowing you to view all outgoing emails within a simple web interface.

vbnet
Copy code
