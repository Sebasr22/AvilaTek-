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
                    throw new Error('El producto no cuenta con el stock suficiente para realizar la compra');
                }
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

            const productsAvailable = await Promise.all(products.map(async product => {
                const productAvailable = await ProductModel.findOne({ _id: product.productID, logical_delete: false });

                if (!productAvailable) {
                    throw new Error('Producto no disponible!');
                }

                return productAvailable;
            }));

            return productsAvailable;
        } catch (error) {
            throw error;
        }
    },

};