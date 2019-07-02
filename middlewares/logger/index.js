const { requestLogger, responseLogger } = require("./access-logger");
const customLogger = require("./custom-logger");

const logger = (level = "info") => {
  return [
    requestLogger(),
    responseLogger(),
    customLogger(level)
  ];
};

module.exports = logger;