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

module.exports = routes;