'use strict';

const { createOrderController } = require('../controllers/order.controller');
const verifyTokenMiddleware = require('../middlewares/tokenMiddleware');
const { createOrderDataValidate } = require('../validations/order.data_validate');

const Router = require('express').Router();

/**
 * 
 * @version        :1.0.0
 * @description    :Realizar pedido
 * @method         :POST
 * @type           :BODY
 * @param {String} productId - id del producto
 * @param {String} quantity - cantidad
 * @returns
 * 
 */
Router.post('/v1/order/create', verifyTokenMiddleware, createOrderDataValidate, createOrderController);

module.exports = Router;