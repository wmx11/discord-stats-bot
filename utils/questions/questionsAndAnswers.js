const path = require('path');
const fs = require('fs');

const basePath = 'modules/questions';
const dirs = fs.readdirSync(basePath);

const questionsAndAnswers = dirs.reduce((arr, dirname) => {
  if (!dirname) {
    return;
  }

  const questionObject = {
    type: dirname,
    keywords: require(path.resolve(basePath, dirname, 'keywords')),
    answer: require(path.resolve(basePath, dirname, 'answer')),
  };

  arr.push(questionObject);

  return arr;
}, []);

module.exports = questionsAndAnswers;
