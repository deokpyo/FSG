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
    quantityModel: {
        xs: String,
        s: String,
        m: String,
        l: String,
        xl: String,
        xxl: String,
        xxxl: String
    },
    quantityTotal: {
        type: String,
        default: '',
        required: true
    },
    addonModel:{
        inkCustom: Object,
        inkChange: Object,
        secondPrint: Object,
        opaquePrint: Object,
        neckTags: Object
    },
    rushModel: {
        noRush: Boolean,
        oneDay: Boolean,
        twoDays: Boolean,
        tenDays: Boolean
    },
    priceUnit: {
        type: String,
        default: '',
        required: true
    },
    priceTotal: {
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
    additional: {
        type: String,
        default: '',
        required: false
    },
    timestamp: {
        type: Date,
        default: Date.now
    },
});

module.exports = mongoose.model('QuoteSchema', QuoteSchema);
