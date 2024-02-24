'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const OrderHistoryModel = new Schema(
  {
    id_user: {
      type: Schema.Types.ObjectId,
      ref: 'users',
      required: true,
    },
    products: [
      {
        _id: false,
        productID: {
          type: Schema.Types.ObjectId,
          required: true,
        },
        quantity: {
          type: Schema.Types.Number,
          required: true,
        },
      },
    ],
    total_amount: {
      type: Schema.Types.Number,
      required: true,
    },
    order_status: {
      type: Schema.Types.String,
      required: true,
    },
    created_at: {
      type: Schema.Types.Date,
      required: true,
      default: Date.now,
    },
  },
  { minimize: false },
);

module.exports = mongoose.model('order_history', OrderHistoryModel);