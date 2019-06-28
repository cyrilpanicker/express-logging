const morgan = require("morgan");
const winston = require("winston");
const uuid = require("node-uuid");
const getLogger = require("./logger");
const MESSAGE = Symbol.for("message");

morgan.token("id", (request) => {
  if(!request.context){
    const id = uuid.v4();
    request.context = { id };
    return id;
  }
  if(!request.context.id){
    const id = uuid.v4();
    request.context.id = id;
    return id;
  }
  return request.context.id;
});
morgan.token("date", () => new Date().toISOString());

const requestLogFormat = `:date | :id | REQUEST | :remote-addr | :remote-user | :method :url HTTP/:http-version | :referrer | :user-agent`;
const responseLogFormat = `:date | :id | RESPONSE | :method :url HTTP/:http-version | :status | :res[content-length]`;

const getFormat = () => winston.format((logEntry) => {
  logEntry[MESSAGE] = `${logEntry.message.trim()}`;
  return logEntry;
})();

const logger = getLogger(getFormat());
const stream = { write: (message) => logger.info(message) };

const requestLogger = morgan(requestLogFormat, { immediate: true, stream });
const responseLogger = morgan(responseLogFormat, { stream });

module.exports = { requestLogger, responseLogger };