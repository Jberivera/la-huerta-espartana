const sendMail = require('./sendMail');
const mailOptions = {
  from: 'huertaespartana@gmail.com',
  to: 'jberivera@gmail.com, Hamsterventrilocuo@hotmail.com', // list of receivers
  subject: 'Nueva orden ✔', // Subject line
  text: 'Hello world ?', // plaintext body
  html: '<b>Hello world ?</b>' // html body
};

sendMail(mailOptions).then(function (info) {
  console.log('Message sent: ' + info.response);
})
.catch(function (error) {
  console.log(error);
});
