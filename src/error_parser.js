'use strict';

const nameRegex   = /^  at (.+) \((.+):(\d+):(\d+)\)$/;
const noNameRegex = /^  at( )(.+):(\d+):(\d+)$/;

function parseFrame(frame) {
  let name  = null;
  let match = nameRegex.exec(frame);

  if (match) {
    name = match[1];
  } else {
    match = noNameRegex.exec(frame);
  }

  return {
    functionName: name,
    file:   match[2],
    line:   parseInt(match[3]),
    column: parseInt(match[4]),
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
