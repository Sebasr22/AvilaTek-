'use strict';

const Joi = require('joi');
const { checkIfProductsAreAvailableService } = require('../services/order.service');

module.exports = {

    createOrderDataValidate: async (req, res, next) => {
        try {
            const schema = Joi.object({
                products: Joi.array().items(
                    Joi.object({
                        productID: Joi.string().required(),
                        quantity: Joi.number().required(),
                    })
                ).required(),
            });
            await schema.validateAsync(req.body);

            // Verificamos si los productos estan disponibles
            const { products } = req.body;

            const productsAvailable = products.map(product => {
                return {
                    productID: product.productID,
                    quantity: product.quantity,
                };
            });

            const checkIfProductsAreAvailable = await checkIfProductsAreAvailableService(productsAvailable);

            next();
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    },

};