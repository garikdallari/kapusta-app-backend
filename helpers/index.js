const setErrorMessage = res => {
  res.status(401).json({
    status: "error",
    code: 401,
    message: "Not authorized",
  });
};

module.exports = {
  setErrorMessage,
};
