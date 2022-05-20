const crypto = require('crypto');

function getToken() {
  return crypto.randomBytes(16).toString('hex');
}

module.exports = getToken;

// Source: Exercício do course