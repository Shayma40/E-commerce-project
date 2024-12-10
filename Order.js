const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    orderCode: {
        type: String,
        required: true,
        unique: true,
    },
    products: [
        {
            productId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Product',
                required: true,
            },
            quantity: {
                type: Number,
                required:true,
            },
        },
    ],
    totalAmount: {
        type: Number,
        required: true,
    },
    paymentMethod: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        enum: ['Pending', 'Processing', 'Shipped', 'Delivered', 'Canceled'],
        default: 'Pending',
    },
    address: {
        type: String,
        required: true,
    }, email: {
        type: String,
        required: true,
    },
    tracking: {
        status: {
            type: String,
            default: 'Processing',
        },
        estimatedDelivery: {
            type: Date,
        },
        lastUpdated: {
            type: Date,
            default: Date.now,
        },
    },
    shippingProvider: {
        type: String,
    },
    notes: {
        type: String,
    },
}, { timestamps: true });



module.exports = mongoose.model('Order', orderSchema);
