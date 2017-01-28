const nodemailer = require('nodemailer');
const transporter = nodemailer.createTransport('smtps://huertaespartana%40gmail.com:paula,210395@smtp.gmail.com');

const mailOptions = {
  to: 'jberivera@gmail.com, Hamsterventrilocuo@hotmail.com', // list of receivers
  subject: 'Nueva orden ✔', // Subject line
  text: 'Hello world ?', // plaintext body
  html: '<b>Hello world ?</b>' // html body
};

transporter.sendMail(mailOptions, function(error, info) {
  if(error){
    return console.log(error);
  }
  console.log('Message sent: ' + info.response);
});
