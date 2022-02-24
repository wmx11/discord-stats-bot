const replies = require('./replies');
const keywords = require('./keywords');

class Lambo {
  constructor() {
    this.replies = replies;
    this.keywords = keywords;
  }

  getKeywords(message) {
    const { content } = message;
    return this.keywords.filter((key) =>
      content.toLowerCase().includes(key.toLowerCase())
    );
  }

  hasKeywords(message) {
    return this.getKeywords(message).length > 0;
  }

  getRandomNumber() {
    return Math.floor(Math.random() * (this.replies.length - 1));
  }

  generateSuggestion(message) {
    const { content } = message;
    const keywords = this.getKeywords(message);
    let suggestion = content.toLowerCase();

    keywords.forEach((keyword) => {
      suggestion = suggestion.replaceAll(
        keyword.toLowerCase(),
        this.replies[this.getRandomNumber()]
      );
    });

    return suggestion;
  }

  react(message) {
    message.react('🇳');
    message.react('🇴');
  }

  reply(message) {
    const content = 'Did you mean:';
    const suggestion = this.generateSuggestion(message);
    message.reply(`${content} ${suggestion}`);
  }

  reactAndReplyToMessage(message) {
    if (!this.hasKeywords(message)) {
      return;
    }

    this.react(message);
    this.reply(message);
  }
}

module.exports = Lambo;
