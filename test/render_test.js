'use strict';

const render    = require('../src/render');
const transform = require('../src/error_transformer');

it('includes the error name in the title', () => {
  const error = new Error();
  error.name  = 'MyError';
  const html  = render(transform(error));
  const regex = /<title>.+MyError.+<\/title>/;
  assert(regex.exec(html), 'Title does not contain error name');
});

it('includes the error name in the body', () => {
  const error = new Error();
  error.name  = 'MyError';
  const html  = render(transform(error));
  const regex = /<body>[\s\S]+MyError[\s\S]+<\/body>/;
  assert(regex.exec(html), 'Body does not contain error name');
});
