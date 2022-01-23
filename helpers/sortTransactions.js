const sortTransaction = transactions => {
  return [...transactions]
    .sort((a, b) => {
      return Number(b.date.year) - Number(a.date.year);
    })
    .sort((a, b) => {
      if (a.date.year === b.date.year) {
        return Number(b.date.month) - Number(a.date.month);
      }
    })
    .sort((a, b) => {
      if (a.date.year === b.date.year && a.date.month === b.date.month)
        return Number(b.date.day) - Number(a.date.day);
    });
};

module.exports = sortTransaction;
