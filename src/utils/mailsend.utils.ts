import nodemailer from "nodemailer";
import dotenv from 'dotenv'
dotenv.config();

const sendRegistrationEmail = async (email_from: string, email_to: string, subject: string, body: string) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.AUTH_PASS,
    },
    tls: {
      rejectUnauthorized: false,
    },
  });
  let mailOptions = {
    from: email_from,
    to: email_to,
    subject: subject,
    html: `<div>${body}</div>`,
  };
  await transporter.sendMail(mailOptions);
};

export {sendRegistrationEmail};