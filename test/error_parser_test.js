'use strict';

const mod = require('../src/error_parser');

// Error: Hello
//   at Context.<anonymous> (test/error_parser_test.js:6:16)
//   at callFn (mocha/lib/runnable.js:286:21)
//   at Test.Runnable.run (mocha/lib/runnable.js:279:7)
//   at Runner.runTest (mocha/lib/runner.js:421:10)
//   at mocha/lib/runner.js:528:12
//   at next (mocha/lib/runner.js:341:14)
//   at mocha/lib/runner.js:351:7
//   at next (mocha/lib/runner.js:283:14)
//   at Immediate._onImmediate (mocha/lib/runner.js:319:5)
//   at processImmediate [as _immediateCallback] (timers.js:374:17)

describe('parseFrame', () => {
  it('works for case 0', () => {
    const frame    = '  at Context.<anonymous> (test/error_parser.js:6:16)';
    const result   = mod.parseFrame(frame);
    const expected = {
      functionName: 'Context.<anonymous>',
      file: 'test/error_parser.js',
      line: 6,
      column: 16,
    };
    assert.deepEqual(expected, result);
  });

  it('works for case 1', () => {
    const frame    = '  at callFn (mocha/lib/runnable.js:286:21)';
    const result   = mod.parseFrame(frame);
    const expected = {
      functionName: 'callFn',
      file: 'mocha/lib/runnable.js',
      line: 286,
      column: 21,
    };
    assert.deepEqual(expected, result);
  });

  it('works for case 2', () => {
    const frame    = '  at Test.Runnable.run (mocha/lib/runnable.js:279:7)';
    const result   = mod.parseFrame(frame);
    const expected = {
      functionName: 'Test.Runnable.run',
      file: 'mocha/lib/runnable.js',
      line: 279,
      column: 7,
    };
    assert.deepEqual(expected, result);
  });
});

//   at Runner.runTest (mocha/lib/runner.js:421:10)
//   at mocha/lib/runner.js:528:12
//   at next (mocha/lib/runner.js:341:14)
//   at mocha/lib/runner.js:351:7
//   at next (mocha/lib/runner.js:283:14)
//   at Immediate._onImmediate (mocha/lib/runner.js:319:5)
//   at processImmediate [as _immediateCallback] (timers.js:374:17)

xit('works', () => {
  const err  = new Error('Hello');
  const data = mod.parse(err);
  const expected = {
    stack: [
      {
        functionName: 'Context.<anonymous>',
        file: 'test/error_parser_test.js',
      },
    ],
  };
  assert.deepEqual(expected, data);
});
