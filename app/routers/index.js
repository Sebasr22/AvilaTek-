'use strict';

const authRouter = require('./auth.router');
const productRouter = require('./product.router');

module.exports = (app) => {
  app.use(authRouter);
  app.use(productRouter);
};
