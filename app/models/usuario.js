var mongoose = require('mongoose');
var findOrCreate = require('mongoose-findorcreate');

module.exports = function() {
    var schema = mongoose.Schema({
        login: {
            type: String,
            required: true,
            index: {
                unique: true
            }
        },
        senha: {
            type: String,
            required: true
        },
        nome: {
            type: String
        },
        perfil: {
            type: String
        },
        online: {
            type: Boolean,
            default: false
        },
        onlineData: {
            type: Date
        },
        avatar: {
            imgNome: String
        },
        inclusao: {
            type: Date,
            default: Date.now
        }
    });

    return mongoose.model('Usuario', schema);
};