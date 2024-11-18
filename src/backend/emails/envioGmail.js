import nodemailer from "nodemailer";

const emailHelper = async (to, subject, text, attachment) => { // Agregar attachment como parámetro
  // Create a transporter
  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "programacionprueba99@gmail.com",
      pass: "lzrf mrrx tguq nkel",
    },
  });

  // Set up email options
  let mailOptions = {
    from: "programacionprueba99@gmail.com",
    to: to,
    subject: subject,
    text: text,
    attachments: attachment ? [
      {
        filename: attachment.originalname,
        content: attachment.buffer,
      }
    ] : [],
  };

  // Send the email
  try {
    let info = await transporter.sendMail(mailOptions);
    console.log("Email sent: " + info.response);
    return info;
  } catch (error) {
    console.error("Error sending email:", error);
    throw error;
  }
};

export default emailHelper;