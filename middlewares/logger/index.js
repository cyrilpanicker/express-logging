const { requestLogger, responseLogger } = require("./access-logger");
const customLogger = require("./custom-logger");

module.exports = [ requestLogger, responseLogger, customLogger ];