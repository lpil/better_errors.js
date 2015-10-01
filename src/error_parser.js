'use strict';

const nameRegex   = /at (.+) \((.+):(\d+):(\d+)\)$/;
const noNameRegex = /at( )(.+):(\d+):(\d+)$/;

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

const firstRegex = /Error: (.+)$/;

function parseError(err) {
  const stack = err.stack.split('\n');
  const first = stack.shift();
  const name  = firstRegex.exec(first)[1];

  return {
    message: name,
    stack: stack.map(parseFrame),
  };
}

module.exports = { parseError, parseFrame };
