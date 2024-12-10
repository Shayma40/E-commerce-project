const mongoose = require('mongoose');

const subscriberSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    confirmed: {
        type: Boolean,
        default: false,
    },
    confirmationToken: { 
        type: String,
        default: null
    },
    tokenExpires: {
        type: Date,
        default: null
    }
});


const Subscriber = mongoose.model('Subscriber', subscriberSchema);
module.exports = Subscriber;