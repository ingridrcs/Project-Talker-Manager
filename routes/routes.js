const express = require('express');

const routes = express.Router();

const { readTalker, writeTalker } = require('../helpers/index');

const validationLogin = require('../middleware/validateTask');
const getToken = require('../getToken/getToken');
const { validateName, validateAge, validateWatchedAt, validateRate,
  validateTalk, validationToken } = require('../middleware/validateUser');

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

routes.post('/login', validationLogin, (_req, res) => {
  const token = getToken();
  return res.status(200).json({ token });
});

routes.post('/talker', validationToken, validateAge, validateName, validateTalk,
validateWatchedAt, validateRate, async (req, res) => {
  const { name, age, talk: { watchedAt, rate } } = req.body;
  const readFile = await readTalker();
  const newUser = {
    id: Math.max(...readFile.map((talk) => talk.id)) + 1,
    name,
    age,
    talk: {
      watchedAt,
      rate,
    },
  };
  readFile.push(newUser);
  await writeTalker(readFile);
  return res.status(201).json(newUser);
});

routes.put('/talker/:id', validationToken, validateAge, validateName, validateTalk,
validateWatchedAt, validateRate, async (req, res) => {
const { id } = req.params;
const { name, age, talk: { watchedAt, rate } } = req.body;
const readFile = await readTalker();
const userIndex = readFile.findIndex((user) => user.id === parseInt(id, 10));
if (userIndex === -1) {
  return res.status(404).json({ message: 'User not found' });
}
readFile[userIndex] = {
  ...readFile[userIndex], name, age, talk: { watchedAt, rate } };
await writeTalker(readFile);
return res.status(200).json(readFile[userIndex]);
});

routes.delete('/talker/:id', validationToken, async (req, res) => {
const { id } = req.params;
const readFile = await readTalker();
const userIndex = readFile.findIndex((user) => user.id === parseInt(id, 10));
if (userIndex === -1) {
  return res.status(404).json({ message: 'User not found' });
}
readFile.splice(userIndex, 1);
await writeTalker(readFile);

return res.status(204).json(userIndex);
});
module.exports = routes;

// Source: parseInt https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/parseInt
// Source: https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/Math/max
// Source: Aula ao Vivo módulo 22.4