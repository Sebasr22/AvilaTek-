'use strict';

const { createOrderService } = require('../services/order.service');

module.exports = {

    /**
     * 
     * @version        :1.0.0
     * @description    :Realizar pedido
     * @param {Object} req - solicitud
     * @param {Object} res - respuesta
     * @returns
     * 
     */
    async createOrderController(req, res) {
        try {

            const { products } = req.body; 

            // Creamos el pedido
            const order = await createOrderService(req.userData._id, products);

            console.log(order);

            res.status(200).json({ message: 'Pedido creado' });
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    },

};