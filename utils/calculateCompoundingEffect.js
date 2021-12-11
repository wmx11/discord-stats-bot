module.exports = (initialBalance, interestRate, timePeriodsElapsed) =>
  initialBalance * (1 + interestRate / 1) ** timePeriodsElapsed;
