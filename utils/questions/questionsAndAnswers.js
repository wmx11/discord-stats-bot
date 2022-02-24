const path = require('path');
const fs = require('fs');
const sanitizeString = require('../sanitizeString');

const basePath = 'modules/questions';
const dirs = fs.readdirSync(basePath);

const questionsAndAnswers = dirs.reduce((arr, dirname) => {
  if (!dirname) {
    return;
  }

  const keywordsArray = require(path.resolve(basePath, dirname, 'keywords'));

  const sanitizedKeywords = keywordsArray.map((phrase) => {
    return (sanitizedPhrase = sanitizeString(phrase));
  });

  let allowedChannels = [];

  try {
    allowedChannels = require(path.resolve(basePath, dirname, 'channels'))
  } catch (error) {
    
  }

  const questionObject = {
    type: dirname,
    keywords: sanitizedKeywords,
    answer: require(path.resolve(basePath, dirname, 'answer')),
    channels: allowedChannels
  };

  arr.push(questionObject);

  return arr;
}, []);

module.exports = questionsAndAnswers;
