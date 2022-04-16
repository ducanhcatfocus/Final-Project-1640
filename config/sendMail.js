require("dotenv").config();
const nodeMailer = require("nodemailer");

const sendMail = (to, text) => {
  var transport = nodeMailer.createTransport({
    host: process.env.HOST,
    port: process.env.PORTMAIL,
    auth: {
      user: process.env.MAIL,
      pass: process.env.PASSMAIL,
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
