const winston = require("winston");
const uuid = require("node-uuid");
const MESSAGE = Symbol.for("message");

const getFormat = ({ id }) => winston.format((logEntry, options) => {
  const { level, message } = logEntry;
  const timestamp = new Date().toISOString();
  logEntry[MESSAGE] = `${timestamp} | ${options.id} | ${level.toUpperCase()} | ${message}`;
  return logEntry;
})({ id });

const transports = [new winston.transports.Console({
  stderrLevels:["warn","error"]
})];

const customLogger = (level="silly") => {
  return (request, _, next) => {
    if (!request.context) {
      const id = uuid.v4();
      request.context = { id };
    }
    if (!request.context.id) {
      const id = uuid.v4();
      request.context.id = id;
    }
    request.context.logger = winston.createLogger({
      level,
      format: getFormat(request.context),
      transports
    });
    next();
  };
};

module.exports = customLogger;