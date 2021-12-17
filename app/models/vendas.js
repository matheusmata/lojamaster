var mongoose = require('mongoose');
var findOrCreate = require('mongoose-findorcreate');

module.exports = function () {
    var schema = mongoose.Schema({
        
        
        cliente: {
            type: mongoose.Schema.ObjectId,
            ref: 'Cliente'

        },

        produtos: {
            type: Array
        },

        data: {
            type: Date,
            default: Date.now
        
        }

        
    });

    return mongoose.model('Venda', schema);
};