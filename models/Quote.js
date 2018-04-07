const mongoose = require('mongoose');

const QuoteSchema = new mongoose.Schema({
    shirt: {
        type: String,
        default: '',
        required: true
    },
    color: {
        type: String,
        default: '',
        required: true
    },
    quantity: {
        type: String,
        default: '',
        required: true
    },
    quantityModel: {
        xs: String,
        s: String,
        m: String,
        l: String,
        xl: String,
        xxl: String,
        xxxl: String
    },
    price: {
        type: String,
        default: '',
        required: true
    },
    name: {
        type: String,
        default: '',
        required: true
    },
    email: {
        type: String,
        default: '',
        required: true
    },
    timestamp: {
        type: Date,
        default: Date.now
    },
});

module.exports = mongoose.model('QuoteSchema', QuoteSchema);
