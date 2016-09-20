const express = require('express');
const fs = require('fs');

const TEMPLATE = fs.readFileSync('./index.html', { encoding: 'utf8' });
const PORT = process.env.PORT || 3000;

const app = express();

app.use('/dist', express.static('dist'));
app.use('/assets', express.static('assets'));

app.get('*', function (req, res) {
  res.send(
    TEMPLATE.replace('#no-styles', '/dist/css/main.css')
  );
});

app.listen(PORT, function () {
  console.log(`Example app listening on port ${PORT}!`);
});
