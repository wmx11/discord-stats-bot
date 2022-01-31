module.exports = (string) =>
  string.toLowerCase().replace(/[~!@#$%^&*()_\-+=:;'",./?`']*/g, '');
