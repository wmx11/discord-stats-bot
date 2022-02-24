const axios = require('axios');

class Harley {
  constructor(apiKey) {
    this.apiKey = apiKey;
    this.endpoint = 'https://harley-the-chatbot.p.rapidapi.com/talk/bot';
  }

  request(message) {
    return axios({
      method: 'POST',
      url: this.endpoint,
      headers: {
        'content-type': 'application/json',
        accept: 'application/json',
        'x-rapidapi-host': 'harley-the-chatbot.p.rapidapi.com',
        'x-rapidapi-key': this.apiKey,
      },
      data: {
        client: '',
        bot: 'harley',
        message,
      },
    });
  }

  async reply(message) {
    const { data } = await this.request(message);

    if (!data.success) {
      return;
    }

    const {
      data: {
        conversation: { output },
      },
    } = data;

    if (output) {
      return output;
    }
  }
}

module.exports = Harley;
