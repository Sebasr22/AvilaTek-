'use strict';

const Router = require('express').Router();

const { registerController, loginController, } = require('../controllers/auth.controller');
const { registerDataValidate, loginDataValidate, } = require('../validations/auth.data_validate');

/**
 *
 * @version        :1.0.0
 * @description    :Registro
 * @method         :POST
 * @type           :BODY
 * @param {String} username - nombre de usuario
 * @param {String} password - contraseña
 * @param {String} confirmPassword - confirmar contraseña
 * @param {String} email - correo 
 * @param {String} name - nombre
 * @returns
 *
 */

Router.post('/v1/auth/register', registerDataValidate, registerController);

/**
 *
 * @version        :1.0.0
 * @description    :Iniciar sesion
 * @method         :POST
 * @type           :BODY
 * @param {String} username - nombre de usuario o correo
 * @param {String} password - contraseña
 * @returns
 *
 */
Router.post('/v1/auth/login', loginDataValidate, loginController);

module.exports = Router;