var mongoose = require('mongoose');
var findOrCreate = require('mongoose-findorcreate');

module.exports = function () {
    var schema = mongoose.Schema({
        
        
        idVenda: {
            type: mongoose.Schema.ObjectId,
            ref: 'Venda'

        },

        idProduto: {
            type: mongoose.Schema.ObjectId,
            ref: 'Produto'

        },
    
        nomeProduto: {
            type: String,
            ref: 'Produto'
        },

        quantidade: {
            type: Number
        
        },

        valor: {
            type: String,
            ref: 'Produto'
        }


        
    });

    return mongoose.model('Item', schema);
};