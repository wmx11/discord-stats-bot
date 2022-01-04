const questionsAndAnswers = require('./questionsAndAnswers');

module.exports = (message) => {
  const { content } = message;

  const foundAnswer = questionsAndAnswers.reduce((answer, question) => {
    const foundKeyword = question.keywords.find((keyword) => content.toLowerCase().includes(keyword.toLowerCase().trim()));

    if (foundKeyword) {
      return Object.assign(answer, question);
    }

    return answer;
  }, {});

  if (!Object.keys(foundAnswer).length) {
    return;
  }

  return message.reply(foundAnswer.answer);
};
