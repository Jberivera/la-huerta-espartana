const express = require('express');
const router = express.Router();
const fs = require('fs');

const TEMPLATE = fs.readFileSync('./index.html', { encoding: 'utf8' })
  .replace('#styles', '/dist/css/main.css');
const COMODO = fs.readFileSync('./F0158D48347E1C0C779EE51A7420584D.txt', { encoding: 'utf8' });
const PORT = process.env.PORT || 3000;

const app = express();

router.get('/date', function (req, res) {
  const date = new Date();
  date.setHours(0, 0, 0, 0);
  res.send(date.getTime().toString());
});

app.use('/api', router);

app.use('/dist', express.static('dist'));
app.use('/assets', express.static('assets'));

app.get('/F0158D48347E1C0C779EE51A7420584D.txt', function (req, res) {
  res.send(COMODO);
});

app.get([
  '/',
  '/mercado',
  '/carrito',
  '/pedidos',
  '/pedido/*',
  '/admin'], function (req, res) {
  res.send(
    TEMPLATE
  );
});

app.listen(PORT, function () {
  console.log(`Server listening on port ${PORT}!`);
});
