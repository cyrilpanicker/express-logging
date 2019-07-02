const express = require("express");
const { context, logger } = require("./middlewares");

const app = express();

const helper = ({ logger }) => {
  logger.debug("debug");
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
app.use(logger("info"));
app.get("/",handler1);
app.get("/route1",handler1);
app.get("/route2",handler2);

app.listen(8080,()=>console.log("listening at 8080"));