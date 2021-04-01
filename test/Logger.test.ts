import { Logger } from '../util/Logger.ts';
import { assertEquals } from 'asserts';

let logs: string[] = [];

const encoder = new TextEncoder();

console.log = function (...data: any[]): void {
  logs.push(data[0]);
  Deno.stdout.writeSync(encoder.encode(`${data[0]}\n`));
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
