'use strict';

const jwt = require('jsonwebtoken');

const { createUserService } = require('../services/auth.service');

module.exports = {

    /**
     * 
     * @version        :1.0.0
     * @description    :Registro
     * @param {Object} req - solicitud
     * @param {Object} res - respuesta
     * @returns
     * 
     */
    async registerController(req, res) {
        try {

            const { username, password, email, name } = req.body;

            const user = await createUserService(username, password, email, name);

            res.status(201).json({ message: 'Usuario creado', user });
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    },

    /**
     * 
     * @version        :1.0.0
     * @description    :Iniciar sesion
     * @param {Object} req - solicitud
     * @param {Object} res - respuesta
     * @returns
     * 
     */
    async loginController(req, res) {
        try {
            const secretKey = process.env.JWT_SECRET_KEY;
            const { DB_USER } = req.USER;

            // Definimos la respuesta
            const RESPONSE = {
                _id: DB_USER._id,
                username: DB_USER.username,
                email: DB_USER.email,
                name: DB_USER.name,
            };

            // Creamos el token
            const token = jwt.sign(RESPONSE, secretKey, { expiresIn: '3d' });

            RESPONSE.token = token;

            res.status(200).json({ message: 'Sesion iniciada', RESPONSE });
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    },
};