const winston = require("winston");
const uuid = require("node-uuid");
const getLogger = require("./logger");
const MESSAGE = Symbol.for("message");

const getFormat = ({ id }) => winston.format((logEntry, options) => {
  const { level, message } = logEntry;
  const timestamp = new Date().toISOString();
  logEntry[MESSAGE] = `${timestamp} | ${options.id} | ${level.toUpperCase()} | ${message}`;
  return logEntry;
})({ id });

const customLogger = (request, _, next) => {
  if(!request.context){
    const id = uuid.v4();
    request.context = { id };
  }
  if(!request.context.id){
    const id = uuid.v4();
    request.context.id = id;
  }
  request.context.logger = getLogger(getFormat(request.context));
  next();
};

module.exports = customLogger;