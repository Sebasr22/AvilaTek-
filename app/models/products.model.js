'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema(
    {
        name: {
            type: Schema.Types.String,
            required: true
        },
        price: {
            type: Schema.Types.Number,
            required: true
        },
        description: {
            type: Schema.Types.String,
            required: true
        },
        stock: {
            type: Schema.Types.Number,
            required: true
        },
        logical_delete: {
            type: Schema.Types.Boolean,
            default: false
        },
        createdAt: {
            type: Date,
            default: Date.now
        }
    });

const Product = mongoose.model('products', productSchema);

module.exports = Product;
