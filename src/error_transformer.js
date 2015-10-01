'use strict';

const parser = require('./error_parser');

function transform(error) {
  error = parser.parseError(error);
  return { error };
}

module.exports = transform;
