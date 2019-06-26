const uuid = require("node-uuid");

const context = (request, _, next) => {
  const id = uuid.v4();
  request.context = { id };
  next();
};

module.exports = context;