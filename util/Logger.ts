import { bold, brightBlue, gray, red, yellow } from 'colors';

type LogLevel = 'debug' | 'info' | 'warn' | 'error';

/**
 * Basic logger
 */
export class Logger {
  /**
   * Whether or not color log
   */
  noColor: boolean;

  /**
   * Whether or not output debug log
   */
  verbose: boolean;

  logs: string[] = [];

  /**
   * @constructor
   * @param { boolean } noColor Whether or not color the log
   * @param { boolean } verbose Whether or not output debug log
   */
  constructor(noColor: boolean, verbose: boolean) {
    this.noColor = noColor;
    this.verbose = verbose;
  }

  /**
   * Output debug log
   * @param { string } content Log content
   */
  debug(content: string): void {
    this.log('debug', content);
  }

  /**
   * Output info log
   * @param { string } content Log content
   */
  info(content: string): void {
    this.log('info', content);
  }

  /**
   * Output warning log
   * @param { string } content Log content
   */
  warn(content: string): void {
    this.log('warn', content);
  }

  /**
   * Output error log
   * @param { string } content Log content
   */
  error(content: string): void {
    this.log('error', content);
  }

  /**
   * Output log
   * @param { LogLevel } level Log level
   * @param { string } content Log content
   */
  log(level: LogLevel, content: string): void {
    const notColordLog = Logger.generateLog(level, content, true);
    this.logs.push(notColordLog);

    if (level !== 'debug') {
      if (!this.noColor) {
        const coloredLog = Logger.generateLog(level, content, false);
        console.log(coloredLog);
      } else {
        console.log(notColordLog);
      }
    } else if (this.verbose) {
      if (!this.noColor) {
        const coloredLog = Logger.generateLog(level, content, false);
        console.log(coloredLog);
      } else {
        console.log(notColordLog);
      }
    }
  }

  /**
   * Generate log
   * @param { LogLevel } level Log level
   * @param { string } content Log content
   * @param { boolean } noColor Whether or not color the log
   */
  private static generateLog(
    level: LogLevel,
    content: string,
    noColor: boolean,
  ) {
    if (noColor) {
      switch (level) {
        case 'debug':
          return `debug: ${content}`;
        case 'info':
          return `info: ${content}`;
        case 'warn':
          return `warn: ${content}`;
        case 'error':
          return `error: ${content}`;
      }
    } else {
      switch (level) {
        case 'debug':
          return `${bold(gray('debug:'))} ${content}`;
        case 'info':
          return `${bold(brightBlue('info:'))} ${content}`;
        case 'warn':
          return yellow(`${bold('warn:')} ${content}`);
        case 'error':
          return red(`${bold('error:')} ${content}`);
      }
    }
  }
}
