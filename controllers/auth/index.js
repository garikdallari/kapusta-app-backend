const register = require('./register');
const login = require('./login');
const logout = require('./logout');
const current = require('./current');
const { googleAuth } = require('./google');
const { googleRedirect } = require('./google');

module.exports = {
  register,
  login,
  logout,
  current,
  googleAuth,
  googleRedirect,
};
