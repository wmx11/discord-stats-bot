const axios = require('axios');

class WaifuBot {
  constructor(apiKey) {
    this.apiKey = apiKey;
    this.endpoint = 'https://waifu.p.rapidapi.com/path';
    this.situation = ['Girl loves Boy', 'Girl loves cheese', 'Funny'];
  }

  getSituation() {
    return this.situation[Math.floor(Math.random() * this.situation.length)];
  }

  request(message) {
    return axios({
      method: 'POST',
      url: this.endpoint,
      headers: {
        'content-type': 'application/json',
        accept: 'application/json',
        'x-rapidapi-host': 'waifu.p.rapidapi.com',
        'x-rapidapi-key': this.apiKey,
      },
      params: {
        message,
        from_name: 'Boy',
        to_name: 'Girl',
        situation: this.getSituation(),
        translate_from: 'auto',
        translate_to: 'auto',
      },
      data: {},
    });
  }

  async reply(message) {
    const { data } = await this.request(message);

    if (!data) {
      return;
    }

    return data;
  }
}

module.exports = WaifuBot;
