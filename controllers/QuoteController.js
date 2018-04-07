var Quote = require('../models/Quote');

module.exports = {
    // find all quotes
    find: function (params, callback) {
        Quote.find(params, function (err, items) {
            if (err) {
                callback(err, null)
                return
            }
            callback(null, items)
        }).sort({price: 1})
    },
    // find one quote by id
    findById: function (id, callback) {
        Quote.findById(id, function (err, item) {
            if (err) {
                callback(err, null)
                return
            }
            callback(null, item)
        })
    },
    // create a new quote
    create: function (params, callback) {
        Quote.create(params, function (err, item) {
            if (err) {
                callback(err, null)
                return
            }
            callback(null, item)
        })
    },

    // update quote information by id
    update: function (id, params, callback) {
        Quote.findByIdAndUpdate(id, params, {new:true}, function(err, item){
            if(err){
                callback(err, null)
                return
            }
            callback(null, item)
        })
    },
    // delete quote
    delete: function (id, callback) {
        Quote.findByIdAndRemove(id, function(err){
            if(err){
                callback(err, null)
                return
            }
            callback(null, null);
        })
    }
}