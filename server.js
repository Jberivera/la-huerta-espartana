const express = require('express');
const fs = require('fs');

const TEMPLATE = fs.readFileSync('./index.html', { encoding: 'utf8' })
                   .replace('#styles', '/dist/css/main.css');
const PORT = process.env.PORT || 3000;

const app = express();

app.use('/dist', express.static('dist'));
app.use('/assets', express.static('assets'));

app.get('*', function (req, res) {
  res.send(
    TEMPLATE
  );
});

app.listen(PORT, function () {
  console.log(`Example app listening on port ${PORT}!`);
});
