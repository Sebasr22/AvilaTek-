'use strict';

const authRouter = require('./auth.router');
const productRouter = require('./product.router');
const orderRouter = require('./order.router');

module.exports = (app) => {
  app.use(authRouter);
  app.use(productRouter);
  app.use(orderRouter);
};
