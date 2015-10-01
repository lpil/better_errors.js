'use strict';

const http   = require('http');
const app    = require('../src/main');
let error;

(function() {
  error = new Error('Oh dear...');
  error.name = 'SomeError';
}());

function reply(req, res) {
  const page = app(error);
  res.end(page);
}

http.createServer(reply).listen(8000, () => {
  console.log('Server listening on: http://localhost:8000');
});
