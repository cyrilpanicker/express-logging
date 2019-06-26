const winston = require("winston");
const getLogger = require("./logger");
const MESSAGE = Symbol.for("message");

const getFormat = ({ id }) => winston.format((logEntry, options) => {
  const { level, message } = logEntry;
  const timestamp = new Date().toISOString();
  logEntry[MESSAGE] = `${options.id} | ${timestamp} | ${level.toUpperCase()} | ${message}`;
  return logEntry;
})({ id });

const customLogger = (request, _, next) => {
  request.context.logger = getLogger(getFormat(request.context));
  next();
};

module.exports = customLogger;