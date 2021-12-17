var mongoose = require('mongoose');
var findOrCreate = require('mongoose-findorcreate');

module.exports = function () {
    var schema = mongoose.Schema({
        
        nome: {
            type: String
        },

        categoria: {
            type: String
        
        },

        unidade: {
            type: String
        },

        quantidade: {
            type: mongoose.Schema.ObjectId,
            ref: 'Estoque'

        },

        valor: {
            type: Number
        }
    });

    return mongoose.model('Produto', schema);
};