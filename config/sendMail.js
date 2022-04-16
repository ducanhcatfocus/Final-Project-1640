require("dotenv").config();
const nodeMailer = require("nodemailer");

const sendMail = (to, text) => {
  var transport = nodeMailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "948bf9b036c6de",
      pass: "06dfc04aea485c",
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
