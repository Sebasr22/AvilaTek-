'use strict';

const UsersModel = require('../models/users.model');

module.exports = {

    /**
    *
    * @version        :1.0.0
    * @description    :Servicio para validar si existe un nombre de usuario
    * @param {String} username - nombre de usuario
    * @returns
    *
    */
    async checkIfUsernameExistService(_username) {
        try {
            if (!_username) throw new Error('Error, parámetro "_username" no proporcionado');

            const user = await UsersModel.findOne({ username: _username });

            return Boolean(user);
        } catch (error) {
            throw error;
        }
    },

    /**
     * 
     * @version        :1.0.0
     * @description    :Servicio para validar si existe un correo
     * @param {String} email - correo
     * @returns
     * 
     */
    async checkIfEmailExistService(_email) {
        try {
            if (!_email) throw new Error('Error, parámetro "_email" no proporcionado');

            const user = await UsersModel.findOne({ email: _email });

            return Boolean(user);
        } catch (error) {
            throw error;
        }
    },

    /**
    *
    * @version        :1.0.0
    * @description    :Servicio para validar si existe un nombre de usuario o el correo (Login)
    * @param {String} username - nombre de usuario
    * @param {String} email - correo electronico
    * @returns
    *
    */
    async checkIfUsernameOrEmailExistService(_usernameOrEmail) {
        try {
            if (!_usernameOrEmail) throw new Error('Error, parámetro "_usernameOrEmail" no proporcionado');

            const user = await UsersModel.findOne({
                $or: [{ username: _usernameOrEmail }, { email: _usernameOrEmail }],
            });

            return Boolean(user);
        } catch (error) {
            throw error;
        }
    },

    /**
    *
    * @version        :1.0.0
    * @description    :Obtener data del usuario
    * @param {String} _username - correo o usuario
    * @returns
    *
    */
    async getUserService(_username) {
        try {
            if (!_username) throw new Error('Error, parámetro "_usernameOrEmail" no proporcionado');

            const USER = await UsersModel.findOne({
                $or: [{ username: _username }, { email: _username }],
            });

            return USER;
        } catch (error) {
            throw error;
        }
    },

    /**
     * 
     * @version        :1.0.0
     * @description    :Servicio para crear un usuario
     * @param {String} username - nombre de usuario
     * @param {String} password - contraseña
     * @param {String} email - correo
     * @returns
     * 
     */
    async createUserService(_username, _password, _email, _name) {
        try {
            if (!_username) throw new Error('Error, parámetro "_username" no proporcionado');
            if (!_password) throw new Error('Error, parámetro "_password" no proporcionado');
            if (!_email) throw new Error('Error, parámetro "_email" no proporcionado');
            if (!_name) throw new Error('Error, parámetro "_name" no proporcionado');

            const user = await UsersModel.create({
                username: _username,
                email: _email,
                name: _name,
                password: _password,
            })

            return user;
        } catch (error) {
            throw error;
        }
    },

    /**
     * 
     * @version        :1.0.0
     * @description    :Servicio para obtener data del usuario
     * @param {String} idUser - id del usuario
     * @returns
     * 
     */
    async getUserDataService(_idUser) {
        try {
            if (!_idUser) throw new Error('Error, parámetro "_idUser" no proporcionado');

            const user = await UsersModel.findOne({ _id: _idUser });

            return user;
        } catch (error) {
            throw error;
        }
    },


};  