'use strict';

const Joi = require('joi');
const { checkIfProductsAreAvailableService } = require('../services/order.service');
const { getUserDataService } = require('../services/auth.service');

module.exports = {

    createOrderDataValidate: async (req, res, next) => {
        try {
            const schema = Joi.object({
                products: Joi.array().items(
                    Joi.object({
                        productID: Joi.string().hex().length(24).required(),
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

    listOrderDataValidate: async (req, res, next) => {
        try {
            const schema = Joi.object({
                idUser: Joi.string().hex().length(24).required(),
                page: Joi.number(),
                limit: Joi.number(),
            });
            await schema.validateAsync(req.query);

            const { idUser } = req.query;

            const checkIfIdUserExists = await getUserDataService(idUser).catch((error) => {
                throw new Error(error.message);
            });

            if (!checkIfIdUserExists) {
                throw new Error('El usuario no existe');
            }

            next();
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    },
};