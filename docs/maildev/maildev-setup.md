
# 📬 MailDev Setup with Docker and Node.js

This guide explains how to set up [MailDev](https://github.com/maildev/maildev) using Docker and send test emails from a Node.js app.

---

## 1. Run MailDev with Docker

Open your terminal and run:

```bash
docker run -p 1080:1080 -p 1025:1025 maildev/maildev
```

- Port `1025`: MailDev SMTP server (used by your app to send email)
- Port `1080`: MailDev Web UI (used to view received emails)

MailDev will be accessible at:  
👉 [http://localhost:1080](http://localhost:1080)

---

## 2. Configure Node.js App with Nodemailer

Install `nodemailer` if you haven't already:

```bash
npm install nodemailer
```

Then create a script (e.g., `index.js`):

```js
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: 'localhost',
  port: 1025,
  secure: false, // No TLS
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
```

Run your script:

```bash
node index.js
```

Expected output:

```
Email sent: 250 Message queued as <some-id>
```

---

## 3. View Email in MailDev

Go to [http://localhost:1080](http://localhost:1080) in your browser.  
You should see the test email listed.

Click on it to see the content.

---

## ✅ Success!

You now have:
- MailDev running in Docker
- A Node.js app sending emails to it
- A web UI to view test emails

---
