/**
 * Platform Engine — Logging Abstraction
 * Light, configurable logging helper for platform operations.
 */

export type LogLevel = 'debug' | 'info' | 'warn' | 'error';

export class PlatformLogger {
  private static instance: PlatformLogger;
  private minLevel: LogLevel = 'info';
  private prefix: string = '[PlatformEngine]';
  private silent: boolean = false;

  private constructor() {}

  public static getInstance(): PlatformLogger {
    if (!PlatformLogger.instance) {
      PlatformLogger.instance = new PlatformLogger();
    }
    return PlatformLogger.instance;
  }

  public setSilent(silent: boolean): void {
    this.silent = silent;
  }

  public setLogLevel(level: LogLevel): void {
    this.minLevel = level;
  }

  public debug(message: string, ...args: any[]): void {
    if (this.shouldLog('debug')) {
      console.debug(`${this.prefix} [DEBUG] ${message}`, ...args);
    }
  }

  public info(message: string, ...args: any[]): void {
    if (this.shouldLog('info')) {
      console.info(`${this.prefix} [INFO] ${message}`, ...args);
    }
  }

  public warn(message: string, ...args: any[]): void {
    if (this.shouldLog('warn')) {
      console.warn(`${this.prefix} [WARN] ${message}`, ...args);
    }
  }

  public error(message: string, ...args: any[]): void {
    if (this.shouldLog('error')) {
      console.error(`${this.prefix} [ERROR] ${message}`, ...args);
    }
  }

  private shouldLog(level: LogLevel): boolean {
    if (this.silent) return false;
    const levels: LogLevel[] = ['debug', 'info', 'warn', 'error'];
    return levels.indexOf(level) >= levels.indexOf(this.minLevel);
  }
}

export const logger = PlatformLogger.getInstance();
