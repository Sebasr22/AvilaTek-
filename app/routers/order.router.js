'use strict';

const { createOrderController, listOrderController } = require('../controllers/order.controller');
const verifyTokenMiddleware = require('../middlewares/tokenMiddleware');
const { createOrderDataValidate, listOrderDataValidate } = require('../validations/order.data_validate');

const Router = require('express').Router();

/**
 * 
 * @version        :1.0.0
 * @description    :Realizar pedido
 * @method         :POST
 * @type           :BODY
 * @param {List}   products - lista de productos
 * @param {ObjectId} productId - id del producto
 * @param {Number} quantity - cantidad del producto
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
 * @param {String} page - pagina
 * @param {String} limit - limite
 * @returns
 * 
 */
Router.get('/v1/order/list', listOrderDataValidate, listOrderController)

module.exports = Router;