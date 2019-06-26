const winston = require("winston");

const transports = [
  new winston.transports.Console(),
  new winston.transports.File({ filename: 'logs.log' })
];

module.exports = transports;