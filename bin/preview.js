'use strict';

const http = require('http');
const app  = require('../src/render_html');

const args = {
};

function reply(req, res) {
  const page = app(args);
  res.end(page);
}

http.createServer(reply).listen(8000, () => {
  console.log('Server listening on: http://localhost:8000');
});
