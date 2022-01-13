const { Test } = require("../../models");

const testList = async (req, res, next) => {
  const data = await Test.find({});
  res.json(data);
};

module.exports = testList;
