const winston = require("winston");
const transports = require("./transports");

const getLogger = (format) => winston.createLogger({ format, transports })

module.exports = getLogger;