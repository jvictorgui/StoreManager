const express = require('express');
const router = require('./router');

const app = express();
app.use(express.json());

app.use(express.json());

// não remova esse endpoint, é para o avaliador funcionar
app.get('/', (_request, response) => {
  response.json({ status: 'Store Manager UP!' });
});
app.use(router);

app.use(router);

module.exports = app;
