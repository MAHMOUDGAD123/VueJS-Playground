export class Logger {
  private defaultTitle: string;

  constructor(defaultTitle: string) {
    this.defaultTitle = defaultTitle;
  }

  private readonly colorMap = new Map([
    ['info', 46],
    ['success', 42],
    ['warning', 43],
    ['error', 41],
    ['debug', 45],
  ]);

  private logMsg(
    type: 'info' | 'success' | 'warning' | 'error' | 'debug',
    msg: string,
    title?: string,
    clear?: boolean,
  ) {
    if (clear) console.clear();

    const col = this.colorMap.get(type)!;

    console.log(
      `\x1b[1m\x1b[${col}m ${title ?? this.defaultTitle} \x1b[0m \x1b[${col - 10}m${msg}\x1b[0m`,
    );
  }

  info(msg: string, title?: string, clear?: boolean) {
    this.logMsg('info', msg, title, clear);
  }

  success(msg: string, title?: string, clear?: boolean) {
    this.logMsg('success', msg, title, clear);
  }

  warn(msg: string, title?: string, clear?: boolean) {
    this.logMsg('warning', msg, title, clear);
  }

  error(msg: string, title?: string, clear?: boolean) {
    this.logMsg('error', msg, title, clear);
  }

  debug(msg: string, title?: string, clear?: boolean) {
    this.logMsg('debug', msg, title, clear);
  }

  line() {
    // Print only on debug mode
    console.log('\x1b[37m--------------------\x1b[0m');
  }
}
