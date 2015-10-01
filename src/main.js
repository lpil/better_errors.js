'use strict';

const render    = require('../src/render');
const transform = require('../src/error_transformer');

module.exports = (err) => render(transform(err));
