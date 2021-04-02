import { Logger } from '../util/Logger.ts';
import { assertEquals } from 'asserts';

let logs: string[] = [];

const originalConsoleLog = console.log;

// deno-lint-ignore no-explicit-any
console.log = function (...data: any[]): void {
  logs.push(data[0]);
  originalConsoleLog(data[0]);
};

Deno.test('Logger: Check outputed correctly when not verbose', () => {
  // Create logger
  const logger = new Logger(true, false);

  // Remove all logs
  logs = [];

  // Logging
  logger.debug('Hello, World!');
  logger.info('Hello, World!');
  logger.warn('Hello, World!');
  logger.error('Hello, World!');

  assertEquals([
    'info: Hello, World!',
    'warn: Hello, World!',
    'error: Hello, World!',
  ], logs);
});

Deno.test('Logger: Check outputed correctly when verbose', () => {
  // Create logger
  const logger = new Logger(true, true);

  // Remove all logs
  logs = [];

  // Logging
  logger.debug('Hello, World!');
  logger.info('Hello, World!');
  logger.warn('Hello, World!');
  logger.error('Hello, World!');

  assertEquals([
    'debug: Hello, World!',
    'info: Hello, World!',
    'warn: Hello, World!',
    'error: Hello, World!',
  ], logs);
});

Deno.test('Logger: Check colored when not debug level', () => {
  // Create logger
  const logger = new Logger(false, true);

  // Remove all logs
  logs = [];

  // Logging
  logger.debug('Hello, World!');
  logger.info('Hello, World!');
  logger.warn('Hello, World!');
  logger.error('Hello, World!');

  assertEquals([
    '\x1b[1m\x1b[90mdebug:\x1b[39m\x1b[22m Hello, World!',
    '\x1b[1m\x1b[94minfo:\x1b[39m\x1b[22m Hello, World!',
    '\x1b[33m\x1b[1mwarn:\x1b[22m Hello, World!\x1b[39m',
    '\x1b[31m\x1b[1merror:\x1b[22m Hello, World!\x1b[39m',
  ], logs);
});
