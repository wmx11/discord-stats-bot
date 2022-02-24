const Harley = require('./Harley');
const WaifuBot = require('./WaifuBot');

const sanitizeString = require('../../utils/sanitizeString');

class ChatWithBot {
  constructor(liveForSeconds) {
    this.trigger = 'hey bot';
    this.killCommand = 'stop bot';
    this.signOffMessage = 'It was nice talking to you';
    this.liveFor = liveForSeconds * 1000;
    this.cooldown = 2.5 * 1000;
    this.isAlive = false;
    this.timer = null;
    this.isOnCooldown = false;
    this.chatBots = [
      new Harley(process.env.HARLEYBOT_API_KEY),
      new WaifuBot(process.env.HARLEYBOT_API_KEY),
    ];
    this.chatBot = null;
  }

  isTriggered(message) {
    const { content } = message;
    const sanitizedMessage = sanitizeString(content);
    return sanitizedMessage.includes(this.trigger);
  }

  shouldKillBot(message) {
    const { content } = message;
    const sanitizedMessage = sanitizeString(content);
    return sanitizedMessage.includes(this.killCommand);
  }

  setChatBot() {
    const randomNumber = Math.floor(Math.random() * this.chatBots.length);
    this.chatBot = this.chatBots[randomNumber];
  }

  canTalk() {
    return this.isAlive;
  }

  setAlive(message) {
    this.isAlive = true;

    this.setChatBot();

    this.timer = setTimeout(() => {
      this.isAlive = false;
      message.reply(this.signOffMessage);
    }, this.liveFor);
  }

  killBot() {
    if (!this.canTalk()) {
      return;
    }

    clearTimeout(this.timer);
    this.timer = null;
    this.isAlive = false;
  }

  applyCooldown() {
    this.isOnCooldown = true;

    setTimeout(() => {
      this.isOnCooldown = false;
    }, this.cooldown);
  }

  async reply(message) {
    if (this.isOnCooldown || !this.chatBot) {
      return;
    }

    const { content } = message;

    try {
      const botMessage = await this.chatBot.reply(content);

      if (!botMessage) {
        return;
      }

      message.reply(botMessage);
      this.applyCooldown();
    } catch (error) {
      console.log(error);
    }
  }

  watch(message) {
    if (!this.isTriggered(message) && !this.canTalk()) {
      return;
    }

    if (this.shouldKillBot(message)) {
      return this.killBot();
    }

    if (!this.canTalk()) {
      this.setAlive(message);
    }

    this.reply(message);
  }
}

module.exports = ChatWithBot;
