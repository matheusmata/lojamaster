var mongoose = require('mongoose');
var findOrCreate = require('mongoose-findorcreate');

module.exports = function () {
    var schema = mongoose.Schema({
        
        produto: {
            type: mongoose.Schema.ObjectId,
            ref: 'Produto'

        },

        tipo: {
            type: String
        },

        quantidade: {
            type: Number
        }
    });

    return mongoose.model('Estoque', schema);
};