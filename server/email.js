const nodemailer = require('nodemailer');
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'huertaespartana@gmail.com',
    pass: 'h#]Y5qt<dXyDV*KA'
  }
});

const mailOptions = {
  from: 'huertaespartana@gmail.com',
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
