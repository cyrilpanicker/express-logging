const winston = require("winston");
const { transports : { Console } } = winston;

const transports = [
  new Console({stderrLevels: ["warn", "error"]})
];

module.exports = transports;