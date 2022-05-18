const fs = require('fs/promises');

const readTasks = async () => {
  const stringTasks = await fs.readFile('./talker.json', 'utf8');
  const tasks = JSON.parse(stringTasks);

  return tasks;
};

const writeTasks = async (tasks) => {
  const stringTasks = JSON.stringify(tasks);

  await fs.writeFile('./talker.json', stringTasks, 'utf8');
};

module.exports = {
  readTasks,
  writeTasks,
};