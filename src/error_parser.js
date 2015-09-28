'use strict';

function parseFrame(frame) {
  var match = /at (.+) \((.+)\)/.exec(frame);
  return {
    foo: frame,
    functionName: match,
  };
}

function parseStack(stack) {
  stack = stack.split('\n');
  stack.shift();
  return stack.map(parseFrame);
}

module.exports = function parse(err) {
  const errorData = {
    stack: parseStack(err.stack),
  };

  return errorData;
};
