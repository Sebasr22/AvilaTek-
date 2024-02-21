'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UsersModel = new Schema(
  {
    username: {
      type: Schema.Types.String,
      required: true,
      lowercase: true,
      unique: true,
    },
    password: {
      type: Schema.Types.String,
      required: true,
    },
    name: {
      type: Schema.Types.String,
      required: true,
      lowercase: true,
    },
    email: {
      type: Schema.Types.String,
      required: true,
      lowercase: true,
    },
    created_at: {
      type: Schema.Types.Date,
      require: true,
      default: Date.now,
    },
    last_update_at: {
      type: Schema.Types.Date,
      require: true,
      default: Date.now,
    },
  },
  { minimize: false },
);

module.exports = mongoose.model('users', UsersModel);
