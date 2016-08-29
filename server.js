const express = require('express');
const fs = require('fs');

const TEMPLATE = fs.readFileSync('./index.html', { encoding: 'utf8' });

const app = express();

app.use('/dist', express.static('dist'));
app.use('/assets', express.static('assets'));

app.get('*', function (req, res) {
  res.send(
    TEMPLATE
  );
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
