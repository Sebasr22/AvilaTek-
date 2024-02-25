'use strict';

const { getUserDataService } = require('../services/auth.service');
const { createOrderService, listOrderService } = require('../services/order.service');

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

            res.status(200).json({ message: 'Pedido creado' });
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    },

    /**
     * 
     * @version        :1.0.0
     * @description    :Listar pedidos
     * @param {Object} req - solicitud
     * @param {Object} res - respuesta
     * @returns
     * 
     */
    async listOrderController(req, res) {
        try {

            const { idUser } = req.query;
            const page = parseInt(req.query.page) || 1;
            const limit = parseInt(req.query.limit) || 10;

            const user = await getUserDataService(idUser);

            const orders = await listOrderService(idUser, page, limit);

            res.status(200).json({ message: `Historial de pedidos del usuario: ${user.username}`, data: orders});
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    },

};