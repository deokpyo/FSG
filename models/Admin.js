var mongoose = require('mongoose')

var AdminSchema = new mongoose.Schema({
    username: {
        type: String,
        trim: true,
        default: '',
        required: true
    },
    password: {
        type: String,
        default: '',
        required: true
    },
    timestamp: {
        type: Date,
        default: Date.now
    },
})

module.exports = mongoose.model('AdminSchema', AdminSchema)