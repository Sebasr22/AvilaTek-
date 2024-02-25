'use strict';

const OrderHistoryModel = require('../models/orderHistory.model');
const ProductModel = require('../models/products.model');

module.exports = {

    /**
     * 
     * @version        :1.0.0
     * @description    :Realizar pedido
     * @param {String} userID - id del usuario
     * @param {Array} products - productos
     * @returns
     * 
     */
    async createOrderService(userID, products) {
        try {

            let productsNotAvailable = [];
            let total_amount = 0;

            const productsToBuy = products.map(product => {
                return {
                    productID: product.productID,
                    quantity: product.quantity,
                };
            });

            for (const product of productsToBuy) {
                const productInfo = await ProductModel.findOne({ _id: product.productID });

                if (productInfo.stock < product.quantity) {
                    productsNotAvailable.push(productInfo.name);
                }
            }

            // Verificamos si los productos estan disponibles
            if (productsNotAvailable.length > 0) {
                throw new Error(`El producto no cuenta con el stock suficiente para realizar la compra: ${productsNotAvailable.join(', ')}`);
            }

            for (const product of productsToBuy) {
                const productInfo = await ProductModel.findOne({ _id: product.productID });
                productInfo.stock -= product.quantity;
                total_amount += productInfo.price * product.quantity;
                await productInfo.save();
            }

            const order = await OrderHistoryModel.create({
                id_user: userID,
                products: productsToBuy,
                total_amount,
                order_status: 'Completado',
            });

            return order;
        } catch (error) {
            throw error;
        }
    },

    /**
     * 
     * @version        :1.0.0
     * @description    :Verificar si los productos estan disponibles
     * @param {Array} products - productos
     * @returns
     * 
     */
    async checkIfProductsAreAvailableService(products) {
        try {

            let productsNotAvailable = [];

            const productsAvailable = await Promise.all(products.map(async product => {
                const productAvailable = await ProductModel.findOne({ _id: product.productID });

                if (!productAvailable) {
                    throw new Error(`El producto no existe con el id: ${product.productID}`);
                }

                if (productAvailable.logical_delete === true) {
                    productsNotAvailable.push(productAvailable.name);
                }

                return productAvailable;
            }));

            if (productsNotAvailable.length > 0) {
                throw new Error(`Productos no disponibles: ${productsNotAvailable.join(', ')}`);
            }

            return productsAvailable;
        } catch (error) {
            throw error;
        }
    },

    /**
     * 
     * @version        :1.0.0
     * @description    :Listar pedidos
     * @param {String} idUser - id del usuario
     * @param {String} page - pagina
     * @param {String} limit - limite
     * @returns
     * 
     */
    async listOrderService(idUser, page = 1, limit = 10) {
        try {
            
            const skip = (page - 1) * limit;

            // Utilizar mongoose para realizar la consulta con paginación
            const orders = await OrderHistoryModel
                .find({ id_user: idUser })
                .skip(skip)
                .limit(limit)

            return orders;
        } catch (error) {
            throw error;
        }
    }
};