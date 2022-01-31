const axios = require('axios');

class BscScan {
  constructor(apiKey) {
    this.apiKey = apiKey;
    this.endpoint = 'https://api.bscscan.com/api';

    this._API_KEY = `apikey=${this.apiKey}`;

    this._MODULE = 'module';
    this._ACTION = 'action';
    this._ADDRESS = 'address';
    this._CONTRACT_ADDRESS = 'contractaddress';

    this._MODULE_ACCOUNT = `${this._MODULE}=account`;
    this._MODULE_STATS = `${this._MODULE}=stats`;

    this._ACTION_BALANCE = `${this._ACTION}=balance`;
    this._ACTION_TOKEN_SUPPLY = `${this._ACTION}=tokensupply`;
  }

  request(query) {
    return axios({
      method: 'GET',
      url: `${this.endpoint}${query}`,
    });
  }

  buildQuery(args) {
    return `?${args.join('&')}&${this._API_KEY}`;
  }

  getTokenTotalSupplyByContractAddress(accountAddress) {
    const module = this._MODULE_STATS;
    const action = this._ACTION_TOKEN_SUPPLY;
    const contractaddress = `${this._CONTRACT_ADDRESS}=${accountAddress}`;
    const query = this.buildQuery([module, action, contractaddress]);

    return this.request(query);
  }

  getBnbBalanceSingleAddress(accountAddress) {
    const module = this._MODULE_ACCOUNT;
    const action = this._ACTION_BALANCE;
    const address = `${this._ADDRESS}=${accountAddress}`;
    const query = this.buildQuery([module, action, address]);

    return this.request(query);
  }
}

module.exports = BscScan;
