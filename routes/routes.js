const express = require('express');

const routes = express.Router();

const { readTasks } = require('../helpers/index');

routes.get('/talker', async (req, res) => {
  const readFile = await readTasks();
  if (!readFile) {
    return res.status(200).json([]);
  }
  return res.status(200).json(readFile);
});

routes.get('/talker/:id', async (req, res) => {
  const readFile = await readTasks();
  const { id } = req.params;
  const findId = readFile.find((r) => r.id === parseInt(id, 10));
  if (!findId) {
    return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
  }
  return res.status(200).json(findId);
});
module.exports = routes;

// Source: parseInt https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/parseInt