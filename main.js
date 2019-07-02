const express = require("express");
const context = require("./middlewares/context");
const { requestLogger, responseLogger } = require("./middlewares/logger/access-logger");
const customLogger = require("./middlewares/logger/custom-logger");
const app = express();

const helper = ({ logger }) => {
  logger.silly("silly");
  logger.debug("debug");
  logger.verbose("verbose");
  logger.info("info");
  logger.warn("warn");
  logger.error("error");
};

const handler1 = (request, response) => {
  const { context } = request;
  const { logger } = context;
  logger.info("log written from inside handler1");
  helper(context);
  response.send({message:"OK"});
};

const handler2 = (request, response) => {
  const { context } = request;
  const { logger } = context;
  logger.info("log written from inside handler2");
  helper(context);
  response.send({message:"OK"});
};

app.use(context);
app.use(requestLogger());
app.use(responseLogger());
app.use(customLogger("info"));
app.get("/",handler1);
app.get("/route1",handler1);
app.get("/route2",handler2);

app.listen(8080,()=>console.log("listening at 8080"));