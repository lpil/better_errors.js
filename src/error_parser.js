'use strict';

function parseFrame(frame) {
  var match = /at (.+) \((.+):(\d+):(\d+)\)/.exec(frame);
  return {
    functionName: match[1],
    file: match[2],
    line: match[3],
    column: match[4],
  };
}

function parseStack(stack) {
  stack = stack.split('\n');
  stack.shift();
  return stack.map(parseFrame);
}

function parseError(err) {
  const errorData = {
    stack: parseStack(err.stack),
  };

  return errorData;
}

module.exports = { parseError, parseFrame };
