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

  it('works for case 3', () => {
    const frame    = '  at Runner.runTest (mocha/lib/runner.js:421:10)';
    const result   = mod.parseFrame(frame);
    const expected = {
      functionName: 'Runner.runTest',
      file: 'mocha/lib/runner.js',
      line: 421,
      column: 10,
    };
    assert.deepEqual(expected, result);
  });

  it('works for case 4, no function name', () => {
    const frame    = '  at mocha/lib/runner.js:528:12';
    const result   = mod.parseFrame(frame);
    const expected = {
      functionName: null,
      file: 'mocha/lib/runner.js',
      line: 528,
      column: 12,
    };
    assert.deepEqual(expected, result);
  });

  it('works for case 5', () => {
    const frame    = '  at next (mocha/lib/runner.js:341:14)';
    const result   = mod.parseFrame(frame);
    const expected = {
      functionName: 'next',
      file: 'mocha/lib/runner.js',
      line: 341,
      column: 14,
    };
    assert.deepEqual(expected, result);
  });

  it('works for case 6, with no function name', () => {
    const frame    = '  at mocha/lib/runner.js:351:7';
    const result   = mod.parseFrame(frame);
    const expected = {
      functionName: null,
      file: 'mocha/lib/runner.js',
      line: 351,
      column: 7,
    };
    assert.deepEqual(expected, result);
  });

  it('works for case 7', () => {
    const frame    = '  at next (mocha/lib/runner.js:283:14)';
    const result   = mod.parseFrame(frame);
    const expected = {
      functionName: 'next',
      file: 'mocha/lib/runner.js',
      line: 283,
      column: 14,
    };
    assert.deepEqual(expected, result);
  });

  it('works for case 8', () => {
    const frame    = '  at Immediate._onImmediate (mocha/lib/runner.js:319:5)';
    const result   = mod.parseFrame(frame);
    const expected = {
      functionName: 'Immediate._onImmediate',
      file: 'mocha/lib/runner.js',
      line: 319,
      column: 5,
    };
    assert.deepEqual(expected, result);
  });

  it('works for case 9', () => {
    const frame    = '  at process [as _immediateCallback] (timers.js:374:17)';
    const result   = mod.parseFrame(frame);
    const expected = {
      functionName: 'process [as _immediateCallback]',
      file: 'timers.js',
      line: 374,
      column: 17,
    };
    assert.deepEqual(expected, result);
  });
});

describe('parseError', () => {
  it('assigns the error message if there is one', () => {
    const err  = new Error('Hello');
    const data = mod.parseError(err);
    assert.equal('Hello', data.message);
  });

  it('assigns null if there is no message', () => {
    const err  = new Error();
    const data = mod.parseError(err);
    assert.equal(null, data.message);
  });
});
