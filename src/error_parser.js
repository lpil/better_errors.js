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

const msgRegex = /(\w+): (.+)$/;

function parseError(err) {
  let   type;
  let   msg   = null;
  const stack = err.stack.split('\n');
  const first = stack.shift();
  const match = msgRegex.exec(first);

  if (match) {
    type  = match[1];
    msg   = match[2];
  } else {
    type = first;
  }

  return {
    type:    type,
    message: msg,
    stack:   stack.map(parseFrame),
  };
}

module.exports = { parseError, parseFrame };
