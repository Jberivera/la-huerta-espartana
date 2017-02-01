const nodemailer = require('nodemailer');
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'huertaespartana@gmail.com',
    pass: 'h#]Y5qt<dXyDV*KA'
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
