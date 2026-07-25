import nodemailer from "nodemailer";

let transporter = null;

const getTransporter = () => {
  if (!transporter) {
    console.log("GOOGLE_USER:", process.env.GOOGLE_USER);
    console.log("GOOGLE_CLIENT_ID:", process.env.GOOGLE_CLIENT_ID);
    console.log("CLIENT_SECRET Exists:", !!process.env.GOOGLE_CLIENT_SECRET);
    console.log("REFRESH_TOKEN Exists:", !!process.env.GOOGLE_REFRESH_TOKEN);

    transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        type: "OAuth2",
        user: process.env.GOOGLE_USER,
        clientId: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        refreshToken: process.env.GOOGLE_REFRESH_TOKEN,
        accessToken: process.env.GOOGLE_ACCESS_TOKEN,
      },
    });

    transporter.verify((error, success) => {
      if (error) {
        console.log("Error while connecting to email server:", error);
      } else {
        console.log("Successfully connected to email server:", success);
      }
    });
  }
  return transporter;
};

const sendEmail = async (to, subject, html) => {
  try {
    const transporter = getTransporter();

    console.log("Sending email...");
    console.log("From:", process.env.GOOGLE_USER);
    console.log("To:", to);
    console.log("Subject:", subject);

    const info = await transporter.sendMail({
      from: process.env.GOOGLE_USER,
      to,
      subject,
      html,
    });

    console.log("Email sent:", info.messageId);
    return info;
  } catch (error) {
    console.error("Error sending email:", error);
    console.error("Response:", error.response);
    console.error("Response Code:", error.responseCode);
    console.error("Command:", error.command);
    throw error;
  }
};

export { sendEmail };