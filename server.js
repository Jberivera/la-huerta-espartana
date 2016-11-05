const express = require('express');
const fs = require('fs');

const TEMPLATE = fs.readFileSync('./index.html', { encoding: 'utf8' })
  .replace('#styles', '/dist/css/main.css');
const COMODO = fs.readFileSync('./F0158D48347E1C0C779EE51A7420584D.txt', { encoding: 'utf8' });
const PORT = process.env.PORT || 3000;

const app = express();

app.use('/dist', express.static('dist'));
app.use('/assets', express.static('assets'));

app.get('/F0158D48347E1C0C779EE51A7420584D.txt', function (req, res) {
  res.send(COMODO);
})

app.get('*', function (req, res) {
  res.send(
    TEMPLATE
  );
});

app.listen(PORT, function () {
  console.log(`Server listening on port ${PORT}!`);
});
