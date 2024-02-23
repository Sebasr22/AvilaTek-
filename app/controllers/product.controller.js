'use strict';

const { createProductService, updateProductService, deleteProductService, listProductService } = require("../services/product.service");

module.exports = {

    /**
     * 
     * @version        :1.0.0
     * @description    :Crear producto
     * @param {Object} req - solicitud
     * @param {Object} res - respuesta
     * @returns
     * 
     */
    async createProductController(req, res) {
        try {

            const { name, description, price, stock } = req.body;

            const product = await createProductService(name, description, price, stock).catch((error) => {
                throw new Error(error.message);
            });

            const RESPONSE = {
                _id: product._id,
                name: product.name,
                description: product.description,
                price: product.price,
                stock: product.stock,
            };

            res.status(201).json({ message: 'Producto creado', producto: RESPONSE });
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    },

    /**
     * 
     * @version        :1.0.0
     * @description    :Editar producto
     * @param {Object} req - solicitud
     * @param {Object} res - respuesta
     * @returns
     * 
     */
    async updateProductController(req, res) {
        try {

            const { idProduct, name, description, price, stock } = req.body;

            const product = await updateProductService(idProduct, name, description, price, stock).catch((error) => {
                throw new Error(error.message);
            });

            const RESPONSE = {
                _id: product._id,
                name: product.name,
                description: product.description,
                price: product.price,
                stock: product.stock,
            };

            res.status(200).json({ message: 'Producto actualizado', producto: RESPONSE });
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    },

    /**
     * 
     * @version        :1.0.0
     * @description    :Eliminar producto
     * @param {Object} req - solicitud
     * @param {Object} res - respuesta
     * @returns
     * 
     */
    async deleteProductController(req, res) {
        try {
            const { idProduct } = req.body;

            const product = await deleteProductService(idProduct).catch((error) => {
                throw new Error(error.message);
            });

            res.status(200).json({ message: 'Producto eliminado' });
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    },

    /**
     * 
     * @version        :1.0.0
     * @description    :Listar productos
     * @param {Object} req - solicitud
     * @param {Object} res - respuesta
     * @returns
     * 
     */
    async listProductController(req, res) {
        try {
            const products = await listProductService().catch((error) => {
                throw new Error(error.message);
            });

            res.status(200).json({ products });
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    },

};