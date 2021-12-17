var mongoose = require('mongoose');
var findOrCreate = require('mongoose-findorcreate');

module.exports = function() {
    var schema = mongoose.Schema({
        idPaciente: {
            type: Number,
            required: true
        },
        titulo: {
            type: String
        },
        subTitulo: {
            type: String
        },
        imgNome: {
            type: String,
            required: true
        },
        inclusao: {
            type: Date,
            default: Date.now
        }
    });

    schema.plugin(findOrCreate);
    return mongoose.model('Foto', schema);
};