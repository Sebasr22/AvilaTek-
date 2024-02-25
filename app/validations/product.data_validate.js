'use strict';

const Joi = require('joi');
const { checkifIdProductExistsService } = require('../services/product.service');

module.exports = {

    createProductDataValidate: async (req, res, next) => {
        const schema = Joi.object({
            name: Joi.string().min(6).max(64).required(),
            description: Joi.string().min(12).max(255).required(),
            price: Joi.number().required(),
            stock: Joi.number().required(),
        });

        const { error, value } = schema.validate(req.body);
        if (error) {
            return res.status(400).json({ message: error.details[0].message });
        }

        next();
    },

    updateProductDataValidate: async (req, res, next) => {
        const schema = Joi.object({
            idProduct: Joi.string().hex().length(24).required(),
            name: Joi.string().min(12).max(64),
            description: Joi.string().min(12).max(255),
            price: Joi.number(),
            stock: Joi.number(),
        });

        const { error, value } = schema.validate(req.body);
        if (error) {
            return res.status(400).json({ message: error.details[0].message });
        }

        const { idProduct } = req.body;

        //  ===========================
        //  ======== idProduct ========
        //  ===========================

        const checkifIdProductExists = await checkifIdProductExistsService(idProduct).catch((error) => {
            throw new Error(error.message);
        });

        if (!checkifIdProductExists) {
            return res.status(400).json({ message: 'Error, el id del producto no existe' });
        }

        next();
    },

    deleteProductDataValidate: async (req, res, next) => {
        const schema = Joi.object({
            idProduct: Joi.string().hex().length(24).required(),
        });

        const { error, value } = schema.validate(req.body);
        if (error) {
            return res.status(400).json({ message: error.details[0].message });
        }

        const { idProduct } = req.body;

        //  ===========================
        //  ======== idProduct ========
        //  ===========================

        const checkifIdProductExists = await checkifIdProductExistsService(idProduct).catch((error) => {
            throw new Error(error.message);
        });

        if (!checkifIdProductExists) {
            return res.status(400).json({ message: 'Error, el id del producto no existe' });
        }

        next();
    },

};