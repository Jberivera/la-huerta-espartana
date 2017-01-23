const nodemailer = require('nodemailer');
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASSWORD
  }
});

module.exports = function sendMail (mailOptions) {
  return new Promise(function (resolve, reject) {
    transporter.sendMail(mailOptions, function(error, info) {
      if (error) {
        reject(error);
      } else {
        resolve(info);
      }
    });
  });
};
