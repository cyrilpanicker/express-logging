const express = require("express");
const context = require("./middlewares/context");
const logger = require("./middlewares/logger");
const app = express();

const helper = ({ logger }) => {
  logger.info("log written from inside helper");
};

const handler1 = (request, response) => {
  const { context } = request
  context.logger.info("log written from inside handler1");
  helper(context);
  response.send({message:"OK"});
};

const handler2 = (request, response) => {
  const { context } = request
  context.logger.info("log written from inside handler2");
  helper(context);
  response.send({message:"OK"});
};

app.use(context);
app.use(logger)
app.get("/",handler1);
app.get("/route1",handler1);
app.get("/route2",handler2);

app.listen(8080,()=>console.log("listening at 8080"));