const express = require('express');

const routes = express.Router();

const { readTalker } = require('../helpers/index');

const validation = require('../middleware/validateTask');
const getToken = require('../getToken/getToken');

routes.get('/talker', async (req, res) => {
  const readFile = await readTalker();
  if (!readFile) {
    return res.status(200).json([]);
  }
  return res.status(200).json(readFile);
});

routes.get('/talker/:id', async (req, res) => {
  const readFile = await readTalker();
  const { id } = req.params;
  const findId = readFile.find((r) => r.id === parseInt(id, 10));
  if (!findId) {
    return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
  }
  return res.status(200).json(findId);
});

routes.post('/login', validation, (req, res) => {
  const token = getToken();
  return res.status(200).json({ token });
});
module.exports = routes;

// Source: parseInt https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/parseInt