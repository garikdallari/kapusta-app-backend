const getPack = (pack, key) => {
  const packCopy = JSON.parse(JSON.stringify(pack));
  const data = packCopy.reduce(
    (a, c) => ((a[c[key]] = (a[c[key]] || 0) + c.amount), a),
    {},
  );
  const sortedArray = Object.entries(data).sort((a, b) => b[1] - a[1]);

  return sortedArray.reduce((acc, el) => {
    let newEl = {};
    newEl[key] = el[0];
    newEl.amount = el[1];
    acc.push(newEl);
    return acc;
  }, []);
};

const getBalance = pack => pack.reduce((acc, el) => acc + el.amount, 0);

module.exports = { getPack, getBalance };
