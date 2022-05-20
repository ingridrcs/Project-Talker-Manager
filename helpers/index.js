const fs = require('fs/promises');

const readTalker = async () => {
  const readingTalker = await fs.readFile('./talker.json', 'utf8');
  const tasks = JSON.parse(readingTalker);

  return tasks;
};

const writeTalker = async (tasks) => {
  const writingTalker = JSON.stringify(tasks);

  await fs.writeFile('./talker.json', writingTalker, 'utf8');
};

module.exports = {
  readTalker,
  writeTalker,
};

// Source: Monitoria do Gabriel e Lilian 