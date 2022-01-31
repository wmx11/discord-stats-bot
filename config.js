module.exports = {
  clientId: '927475904735768596',
  guildId: '918902350150787102',
  mainChannelId: '918902350150787105',
  contractAddress: '0xBA96731324dE188ebC1eD87ca74544dDEbC07D7f',
  treasuryAddress: '0x4DD90D3cE962039A3c66d613207aC2d449dFa04F',
  rfvAddress: '0x00dE99c90E8971D3E1c9cBA724381B537F6e88C1',
  playAddress: '0x3ac632f97f389290c61289ecc03564c2a4c20882',
  startDate: '2021-11-17 16:34:35',
  playDrawHour: '14:00:00',
  playDurationDays: 3,
  botEndpoint: 'http://localhost:2000',
  circulatingSupply: 0.026146,
  decimalPlaces: 10 ** 18,
  rewards: {
    perDay: 0.019174073,
  },
  taxes: {
    sell: 0.18,
    buy: 0.13,
  },
  dataFetchCacheTimeout: 5 * 1000 * 60,
  brandColor: '#2cffca',
  allowedChannels: ['925717779095633950', '918902350150787105'],
  moderators: [
    '627459940474421278',
    '573546139450867722',
    '208639946339123201',
  ],
  botIds: ['916354904623288350'],
  botCommands: ['!!c', '!!price'],
  bots: {
    rfv: '930545807101395014',
    treasury: '930546026572550144',
    price: '931270784289214484',
    holders: '931270953470689310',
    marketcap: '933741907119579137'
  },
  blacklist: {
    users: ['897266614796447754'],
    commands: ['897266614796447754'],
  },
  slashCommands: ['charts'],
  commandPrefix: '!!',
  commands: [
    { name: 'stats', description: 'Shows the current stats of $TITANO' },
    {
      name: 'holders',
      description: 'Shows the current amount of people holding $TITANO',
    },
    {
      name: 'compound',
      description:
        '$TITANO compound calculator. !!compound <$TITANO token amount> for <number of days> days',
    },
    { name: 'treasury', description: 'Shows $TITANO Treasury value' },
    { name: 'rfv', description: 'Shows $TITANO RFV value' },
    { name: 'play', description: 'Shows TITANO PLAY stats' },
    { name: 'kiss', description: 'The bot just kisses you. Thank you.' },
    { name: 'help', description: 'Shows all available commands' },
  ],
};
