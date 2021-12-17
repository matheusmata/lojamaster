var mongoose = require('mongoose');
var findOrCreate = require('mongoose-findorcreate');

module.exports = function() {
    var schema = mongoose.Schema({
        de: {
            type: String,
            required: true
        },
        para: {
            type: String,
            required: true
        },
        texto: {
            type: String,
            required: true
        },
        lida: {
            type: Boolean,
            default: false
        },
        inclusao: {
            type: Date,
            default: Date.now
        }
    });

    schema.plugin(findOrCreate);
    return mongoose.model('Mensagem', schema);
};