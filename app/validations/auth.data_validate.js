'use strict';

const Joi = require('joi');
const bcrypt = require('bcrypt');
const { checkIfUsernameExistService, checkIfEmailExistService, checkIfUsernameOrEmailExistService, getUserService } = require('../services/auth.service');

module.exports = {

    registerDataValidate: async (req, res, next) => {
        try {
            const schema = Joi.object({
                username: Joi.string().min(3).max(30).required(),
                password: Joi.string().min(6).max(30).required(),
                confirmPassword: Joi.string().valid(Joi.ref('password')).required(),
                email: Joi.string().email().required(),
                name: Joi.string().min(3).max(30).required(),
            });
            await schema.validateAsync(req.body);

            const { username, password, email } = req.body;


            //  ===========================
            //  ======= username ==========
            //  ===========================

            const usernameExist = await checkIfUsernameExistService(username);

            if (usernameExist) throw new Error('El nombre de usuario ya existe');

            //  ===========================
            //  ========= email ===========
            //  ===========================

            const emailExist = await checkIfEmailExistService(email);

            if (emailExist) throw new Error('El correo ya existe');

            //  ===========================
            //  ======== password =========
            //  ===========================

            // Crear la contraseña encriptada
            const salt = await bcrypt.genSalt(10);
            const passwordEncrypted = await bcrypt.hash(password, salt);

            // Reemplazar la contraseña sin encriptar por la encriptada
            req.body.password = passwordEncrypted;

            next();
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    },

    loginDataValidate: async (req, res, next) => {
        try {
            const schema = Joi.object({
                username: Joi.string().min(3).max(30).required(),
                password: Joi.string().min(6).max(30).required(),
            });
            await schema.validateAsync(req.body);

            const { username, password } = req.body;

            // ===========================
            // ====== username ===========
            // ===========================

            const usernameExist = await checkIfUsernameOrEmailExistService(username);

            if (!usernameExist) throw new Error('Credenciales inválidas');

            // Obtenemos los datos del usuario para validar la contraseña 
            const USER = await getUserService(username).catch((error) => {
                throw error;
            });

            // ===========================
            // ====== password ===========
            // ===========================

            const hashedPassword = USER.password;

            const validPassword = await bcrypt.compare(password, hashedPassword);

            if (!validPassword) {
                return res.status(400).json({ message: 'Credenciales inválidas' });
            }

            req.USER = req.USER || {};
            req.USER.DB_USER = USER;

            next();
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    },
};