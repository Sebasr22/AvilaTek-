'use strict';

const { createOrderController, listOrderController } = require('../controllers/order.controller');
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

/**
 * 
 * @version        :1.0.0
 * @description    :Listar pedidos
 * @method         :GET
 * @type           :Query
 * @returns
 * 
 */
Router.get('/v1/order/list', listOrderController)

module.exports = Router;