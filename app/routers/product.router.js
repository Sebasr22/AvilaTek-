'use strict';

const Router = require('express').Router();

const { get } = require('mongoose');
const { createProductController, updateProductController, deleteProductController, listProductController } = require('../controllers/product.controller');
const verifyTokenMiddleware = require('../middlewares/tokenMiddleware');
const { createProductDataValidate, updateProductDataValidate, deleteProductDataValidate } = require('../validations/product.data_validate');


/**
 * 
 * @version        :1.0.0
 * @description    :Crear producto
 * @method         :POST
 * @type           :BODY
 * @param {String} name - nombre del producto
 * @param {String} description - descripcion del producto
 * @param {Number} price - precio del producto
 * @param {Number} stock - existencia del producto
 * @returns
 * 
 */
Router.post('/v1/product/create', createProductDataValidate, createProductController);

/**
 * 
 * @version        :1.0.0
 * @description    :Editar producto
 * @method         :PUT
 * @type           :BODY
 * @param {ObjectId} idProduct - id del producto
 * @param {String} name - nombre del producto (OPCIONAL)
 * @param {String} description - descripcion del producto (OPCIONAL)
 * @param {Number} price - precio del producto (OPCIONAL)
 * @param {Number} stock - existencia del producto (OPCIONAL)
 * @returns
 * 
 */
Router.put('/v1/product/update', updateProductDataValidate, updateProductController);

/**
 * 
 * @version        :1.0.0
 * @description    :Eliminar producto
 * @method         :DELETE
 * @type           :BODY
 * @param {ObjectId} idProduct - id del producto
 * @returns
 * 
 */
Router.delete('/v1/product/delete', deleteProductDataValidate, deleteProductController);

/**
 * 
 * @version        :1.0.0
 * @description    :Listar productos
 * @method         :GET
 * @returns
 * 
 */
Router.get('/v1/product/list', listProductController);


module.exports = Router;