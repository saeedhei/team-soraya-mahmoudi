# SMTP Testing with MailDev and Docker

## 1. Running MailDev Docker Container

To run MailDev (a local SMTP server for testing), use the following Docker command:

```bash
docker run -p 1080:1080 -p 1025:1025 maildev/maildev

Port 1080: MailDev Web Interface (to view emails sent).

Port 1025: MailDev SMTP (used for sending test emails).

2. Sending Test Email with Nodemailer
Here is the test code to send an email using Nodemailer and the MailDev SMTP server:

const nodemailer = require('nodemailer');

// MailDev SMTP config
const transporter = nodemailer.createTransport({
  host: 'localhost',
  port: 1025,
  secure: false, // no TLS for MailDev
});

const mailOptions = {
  from: '"Test App" <test@example.com>',
  to: 'user@example.com',
  subject: 'Test Email',
  text: 'Hello from Node.js!',
};

transporter.sendMail(mailOptions, (error, info) => {
  if (error) {
    return console.error('Error sending email:', error);
  }
  console.log('Email sent:', info.response);
});

3. Run the Test
To run the test, execute the following command:
node index.js

4. Result of Sending Email
After running the test, the following message should appear in the console:
Email sent: 250 Message queued as 7u3x4YpS

250 is the SMTP response code meaning "OK, email accepted for delivery".

5. Verify the Sent Email in MailDev
Open the MailDev Web Interface at http://localhost:1080.

You should see the test email in the interface.

