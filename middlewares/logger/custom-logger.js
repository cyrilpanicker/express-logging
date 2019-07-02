const winston = require("winston");
const uuid = require("node-uuid");
const transports = require("./transports");
const MESSAGE = Symbol.for("message");

let logger = null;

const getFormat = () => winston.format((logEntry) => {
  const { id, level, message } = logEntry;
  const timestamp = new Date().toISOString();
  logEntry[MESSAGE] = `${timestamp} | ${id} | ${level.toUpperCase()} | ${message}`;
  return logEntry;
})();

const initLogger = (level) => {
  logger = winston.createLogger({ level, transports, format: getFormat() });
};

class Logger {
  constructor(id) {
    this.id = id;
  }
  debug(logEntry) {
    logger.debug(logEntry, { id: this.id });
  }
  info(logEntry) {
    logger.info(logEntry, { id: this.id });
  }
  warn(logEntry) {
    logger.warn(logEntry, { id: this.id });
  }
  error(logEntry) {
    logger.error(logEntry, { id: this.id });
  }
}

const customLogger = (level) => {
  initLogger(level);
  return (request, _, next) => {
    if (!request.context) {
      const id = uuid.v4();
      request.context = { id };
    }
    if (!request.context.id) {
      const id = uuid.v4();
      request.context.id = id;
    }
    request.context.logger = new Logger(request.context.id);
    next();
  };
};

module.exports = customLogger;

