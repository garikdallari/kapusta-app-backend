const normalizeSum = sum => {
  sum *= 100;
  sum = Math.floor(sum) / 100;
  return sum;
};

module.exports = normalizeSum;
