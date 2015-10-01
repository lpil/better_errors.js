'use strict';

const nameRegex   = /at (.+) \((.+):(\d+):(\d+)\)$/;
const noNameRegex = /at( )(.+):(\d+):(\d+)$/;
const nativeRegex = /at (.+) \(native\)$/;

function parseFrame(frame) {
  let functionName = null;
  let line   = null;
  let column = null;
  let file   = null;
  let match  = nameRegex.exec(frame);

  // Is it a named function?
  if (match) {
    functionName = match[1];
  } else {
    // Perhaps it's an anonymous function
    match = noNameRegex.exec(frame);
  }

  if (match) {
    line   = parseInt(match[3]);
    column = parseInt(match[4]);
    file   = match[2];

  } else {
    // It must be a native function.
    match = nativeRegex.exec(frame);
    functionName = match[1];
  }

  return { functionName, file, line, column };
}

const msgRegex = /(\w+): (.+)$/;

function parseError(err) {
  let   name;
  let   msg   = null;
  const stack = err.stack.split('\n');
  const first = stack.shift();
  const match = msgRegex.exec(first);

  if (match) {
    name  = match[1];
    msg   = match[2];
  } else {
    name = first;
  }

  return {
    name:    name,
    message: msg,
    stack:   stack.map(parseFrame),
  };
}

module.exports = { parseError, parseFrame };
