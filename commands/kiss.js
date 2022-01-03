module.exports = async (message) => {
  const { channel } = message;

  return channel.send(`Titano Bot kisses ${message.author.username}`);
};
