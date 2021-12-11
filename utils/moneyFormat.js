module.exports = (number, maxDigits = 3) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumSignificantDigits: 2,
    maximumSignificantDigits: maxDigits,
  }).format(number);
};
