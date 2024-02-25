'use strict';

const ProductsModel = require('../models/products.model');

module.exports = {

    /**
    *
    * @version        :1.0.0
    * @description    :Servicio para crear un producto.
    * @param {String} name - nombre del producto
    * @param {String} description - descripcion del producto
    * @param {Number} price - precio del producto
    * @param {Number} stock - existencia del producto
    * @returns
    *
    */
    async createProductService(_name, _description, _price, _stock) {
        try {
            if (!_name) throw new Error('Error, parámetro "_name" no proporcionado');
            if (!_description) throw new Error('Error, parámetro "_description" no proporcionado');
            if (!_price) throw new Error('Error, parámetro "_price" no proporcionado');
            if (!_stock) throw new Error('Error, parámetro "_stock" no proporcionado');

            const product = await ProductsModel.create({
                name: _name,
                description: _description,
                price: _price,
                stock: _stock,
            }).catch((error) => {
                throw new Error(error.message);
            });

            return product;
        } catch (error) {
            throw error;
        }
    },

    /**
     * 
     * @version        :1.0.0
     * @description    :Servicio para actualizar un producto.
     * @param {ObjectId} idProduct - id del producto
     * @param {String} name - nombre del producto
     * @param {String} description - descripcion del producto
     * @param {Number} price - precio del producto
     * @param {Number} stock - existencia del producto
     * @returns
     * 
     */
    async updateProductService(_idProduct, _name, _description, _price, _stock) {
        try {
            if (!_idProduct) throw new Error('Error, parámetro "_id" no proporcionado');

            const product = await ProductsModel.findByIdAndUpdate(_idProduct, {
                name: _name,
                description: _description,
                price: _price,
                stock: _stock,
            }, { new: true }).catch((error) => {
                throw new Error(error.message);
            });

            return product;
        } catch (error) {
            throw error;
        }
    },

    /**
     * 
     * @version        :1.0.0
     * @description    :Servicio para eliminar un producto.
     * @param {ObjectId} idProduct - id del producto
     * @returns
     *
     */
    async deleteProductService(_idProduct) {
        try {
            if (!_idProduct) throw new Error('Error, parámetro "_idProduct" no proporcionado');

            const product = await ProductsModel.findByIdAndUpdate(_idProduct, {
                logical_delete: true,
            }, { new: true }).catch((error) => {
                throw new Error(error.message);
            });

            return product;
        } catch (error) {
            throw error;
        }
    },

    /**
     * 
     * @version        :1.0.0
     * @description    :Servicio para listar productos.
     * @returns
     * 
     */
    async listProductService(page = 1, limit = 10) {

        try {

            const skip = (page - 1) * limit;

            const products = await ProductsModel.find({
                logical_delete: false,
            }).skip(skip).limit(limit)
                .catch((error) => {
                    throw new Error(error.message);
                });

            return products;
        } catch (error) {
            throw error;
        }

    },

    /**
     * 
     * @version        :1.0.0
     * @description    :Servicio para verificar si un producto existe.
     * @param {ObjectId} idProduct - id del producto
     * @returns
     * 
     */
    async checkifIdProductExistsService(_idProduct) {
        try {
            if (!_idProduct) throw new Error('Error, parámetro "_idProduct" no proporcionado');

            const product = await ProductsModel.findOne({
                _id: _idProduct,
                logical_delete: false,
            }).catch((error) => {
                throw new Error(error.message);
            });

            return Boolean(product);
        } catch (error) {
            throw error;
        }
    },

};