import nodemailer from "nodemailer";
import sendinblue from "nodemailer-sendinblue-transport";
import config from "../config";

// const transporter = nodemailer.createTransport({
//   service: "gmail",
//   port: 2525,
//   secure: false,
//   auth: {
//     user: process.env.GMAIL_USER,
//     pass: process.env.AUTH_PASS,
//   },
//   tls: {
//     rejectUnauthorized: false,
//   },
// });

const transporter = nodemailer.createTransport(new sendinblue({
  apiKey: config.BREVO_API_KEY
}));

const sendRegistrationEmail = async ( email_from: string, email_to: string, subject: string, body: string ) => {
  let mailOptions = {
    from: "kepler.xxiib.cygnus@gmail.com",
    to: email_to,
    subject: subject,
    html: `<div>${body}</div>`,
  };
  try{
    console.log(config.BREVO_API_KEY);
    await transporter.sendMail(mailOptions);
  }
  catch(err){
    console.log(err); 
  }
};

export { sendRegistrationEmail };
