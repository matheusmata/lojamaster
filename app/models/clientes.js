var mongoose = require('mongoose');
var findOrCreate = require('mongoose-findorcreate');

module.exports = function () {
    var schema = mongoose.Schema({
        
        nome: {
            type: String
        },

        telefone: {
            type: String
        
        },

        endereco: {
            type: String
        },

        email: {
            type: String
        },

        documento: {
            type: Number
        }

        
    });

    return mongoose.model('Cliente', schema);
};