const axios = require('axios');

class BitQuery {
  constructor(apiKey) {
    this.apiKey = apiKey;
    this.endpoint = 'https://graphql.bitquery.io/';
  }

  request(query, variables) {
    return axios({
      method: 'POST',
      url: this.endpoint,
      headers: {
        'Content-Type': 'application/json',
        'X-API-KEY': this.apiKey,
      },
      data: JSON.stringify({ query, variables }),
    });
  }

  get(query, variables) {
    return this.request(query, variables);
  }
}

module.exports = BitQuery;
