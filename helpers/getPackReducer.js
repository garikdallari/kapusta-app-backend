const getPack = (pack, key) => {
  const packCopy = JSON.parse(JSON.stringify(pack));
  const data = packCopy.reduce(
    (a, c) => ((a[c[key]] = (a[c[key]] || 0) + c.amount), a),
    {},
  );
  return Object.entries(data);
};

module.exports = getPack;
