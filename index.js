const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());
// escrevi linha 7//
app.use('/', require('./routes/routes'));

const HTTP_OK_STATUS = 200;
const PORT = '3001';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.listen(PORT, () => {
  console.log('Online');
});
