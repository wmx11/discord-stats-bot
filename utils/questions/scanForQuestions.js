const sanitizeString = require('../sanitizeString');
const questionsAndAnswers = require('./questionsAndAnswers');

module.exports = (message) => {
  const { content, channelId } = message;

  const sanitizedContent = sanitizeString(content);

  const foundAnswer = questionsAndAnswers.reduce((answer, question) => {
    const foundQuestion = question.keywords.find((phrase) => {
      return sanitizedContent.includes(phrase);
    });

    if (foundQuestion) {
      return Object.assign(answer, question);
    }

    return answer;
  }, {});

  if (!Object.keys(foundAnswer).length) {
    return;
  }

  if (foundAnswer.channels.find((channel) => channel === channelId)) {
    return;
  }

  return message.reply(foundAnswer.answer);
};
