# MailDev Troubleshooting Guide

## Issue
In our modern login system (Express + Apollo Server + Nodemailer + MailDev running in Docker), Nodemailer could not connect to MailDev properly.

Symptoms:
- `/health` endpoint returned: `Mail server is NOT reachable`
- `register` mutation failed with: `Error: read ECONNRESET`
- Emails were not delivered to MailDev web UI (`localhost:1080`).

---

## Root Cause
- The Nodemailer config was using incorrect settings:
  - `secure` and `ignoreTLS` were mixed and came from `.env` in a confusing way.
  - MailDev runs a plain SMTP server without TLS — so any TLS settings caused handshake failures.
- Sometimes, the MailDev Docker container was not actually running.
- Other times, port `1025` was already in use by a leftover local `npx maildev` process, blocking Docker from binding.
- The `/etc/hosts` file needed to correctly map `127.0.0.1` to `localhost`.

---

## Solution
✅ Final working setup:
1. **Removed `ignoreTLS` completely** from the Nodemailer config.
2. **Hardcoded working config** for local development:
   ```ts
   const transporter = nodemailer.createTransport({
     host: '127.0.0.1',
     port: 1025,
     secure: false,
   });

3. Run MailDev only inside Docker:
    docker run -d --name maildev -p 1080:1080 -p 1025:1025 maildev/maildev

4. Verify /etc/hosts contains:
    127.0.0.1   localhost

5. Make sure port 1025 is free:
    lsof -i :1025
    kill -9 <PID if needed>

6. Check Docker container is healthy:
   docker ps

7. Test /health → should respond: Mail server OK

8. Test the register mutation → email appears in MailDev web UI at http://localhost:1080.

Result
With this approach, MailDev works 100% reliably for local development with Docker.
No more ECONNRESET, no more unreachable mail server.

Date: [Add Date]
Maintainer: Soraya Mahmoudi
