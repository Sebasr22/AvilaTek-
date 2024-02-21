'use strict';

const authRouter = require('./auth.router');

module.exports = (app) => {
  app.use(authRouter);
};
