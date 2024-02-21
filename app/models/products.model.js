'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema(
    {
        user_id: {
            type: Schema.Types.ObjectId,
            ref: 'users',
            required: true
        },
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
        status: {
            type: Schema.Types.String,
            description: 'Estatus del producto (STATUS-ACTIVE, STATUS-COMPLETED o STATUS-DELETED)',
            required: true,
            default: 'STATUS-ACTIVE'
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

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
