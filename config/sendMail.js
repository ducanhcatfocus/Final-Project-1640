require("dotenv").config();
const nodeMailer = require("nodemailer");

const sendMail = (to, text) => {
  var transport = nodeMailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "9f5741d4fd4ad8",
      pass: "4f283866f3c478",
    },
  });

  const options = {
    from: "example-admin@email.com",
    to: to,
    subject: "Automatic messages",
    text: text,
  };

  return transport.sendMail(options);
};

module.exports = {
  sendMail: sendMail,
};
