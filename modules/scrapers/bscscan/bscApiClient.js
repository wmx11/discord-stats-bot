const axios = require('axios');

module.exports = ({ module, action, contractaddress }) =>
  axios.get(
    `https://api.bscscan.com/api?module=${module}&action=${action}&${
      module === 'account' ? 'address' : 'contractaddress'
    }=${contractaddress}&apikey=${process.env.BSC_API_KEY}`
  );
