var mongoose = require('mongoose');
var fs = require('fs');
var Grid = require('gridfs-stream');
var uuid = require('node-uuid');
var path = require('path');
var Jimp = require("jimp");

module.exports = function (app) {
    var Foto = app.models.foto;

    var controller = {};

    controller.gravaArquivo = function(req, res){
        var conn = mongoose.connection;
        Grid.mongo = mongoose.mongo;
        var gfs = Grid(conn.db);

        fs.rename(req.file.path, req.file.path + path.extname(req.file.originalname), function(err) {
            if ( err ) console.log('ERROR: ' + err);
        });

        var callBackResize = function(){
            var imgNome = uuid.v1() + path.extname(req.file.originalname);
            var imgThumbNome = imgNome.replace(path.extname(req.file.originalname), '') + '-thumb' + path.extname(req.file.originalname);

            var writestream = gfs.createWriteStream({
                filename: imgNome
            });

            fs.createReadStream(req.file.path + path.extname(req.file.originalname)).pipe(writestream);

            writestream.on('close', function (file) {
                fs.unlink(req.file.path + path.extname(req.file.originalname), function() {

                });

                var writestream2 = gfs.createWriteStream({
                    filename: imgThumbNome
                });

                fs.createReadStream(req.file.path + '-thumb' + path.extname(req.file.originalname)).pipe(writestream2);

                writestream2.on('close', function (file) {
                    fs.unlink(req.file.path + '-thumb' + path.extname(req.file.originalname), function() {

                    });

                    Foto.create({
                        idPaciente: req.params.idPaciente,
                        titulo: '',
                        subTitulo: '',
                        imgNome: imgNome
                    }).then(function(foto){
                        res.status(201).json(foto);
                    }, function(erro){
                        console.log(erro);
                        res.status(500).json(erro);
                    });
                });
            });
        };

        Jimp.read(req.file.path + path.extname(req.file.originalname), function (err, image) {
            if(err){
                console.log(err);
                res.status(500).json(err);
            }

            image.resize(80, 80)
                .quality(100)
                .invert()
                .brightness(0)
                .contrast(0)
                .opacity(1)
                .write(req.file.path + '-thumb' + path.extname(req.file.originalname)); // save

            callBackResize();
        });
    };

    controller.listaFotos = function(req, res){
        var _id = req.params.idPaciente;

        Foto.find({idPaciente: _id}).exec()
            .then(function(fotos){
                res.json(fotos);
            }, function(erro){
                console.error(erro);
                res.status(500).json(erro);
            });
    };

    controller.obtemFotoThumb = function(req, res){
        var _id = req.params.id;
        var conn = mongoose.connection;
        Grid.mongo = mongoose.mongo;
        var gfs = Grid(conn.db);

        Foto.findById(_id).exec()
            .then(function(foto){
                if(!foto){
                    res.status(404).json('Foto não encontrada.');
                } else {

                    var readstream = gfs.createReadStream({
                        filename: foto.imgNome.replace(path.extname(foto.imgNome), "") + '-thumb' + path.extname(foto.imgNome)
                    });

                    res.set('Content-Type', 'image/'+ path.extname(foto.imgNome).replace('.', ''));
                    readstream.pipe(res);
                }
            }, function(erro){
                console.error(erro);
                res.status(500).json(erro);
            });
    };

    controller.obtemFoto = function(req, res){
        var _id = req.params.id;
        var conn = mongoose.connection;
        Grid.mongo = mongoose.mongo;
        var gfs = Grid(conn.db);

        Foto.findById(_id).exec()
            .then(function(foto){
                if(!foto){
                    res.status(404).json('Foto não encontrada.');
                } else {
                    var readstream = gfs.createReadStream({
                        filename: foto.imgNome
                    });

                    res.set('Content-Type', 'image/'+ path.extname(foto.imgNome).replace('.', ''));
                    readstream.pipe(res);
                }
            }, function(erro){
                console.error(erro);
                res.status(500).json(erro);
            });
    };

    controller.removeFoto = function(req, res){
        var _id = req.params.id;

        Foto.remove({"_id" : _id}).exec()
            .then(function(){
                res.end();
            }, function(erro){
                console.error(erro);
                res.status(500).json(erro);
            }
        );

    };

    controller.salvaFoto = function(req, res){
        var _id = req.body._id;
        if(_id) {
            Foto.findByIdAndUpdate(_id, req.body).exec()
                .then(function(foto){
                    res.json(foto);
                }, function(erro){
                    console.error(erro);
                    res.status(500).json(erro);
                });
        } else {
            Foto.create(req.body)
                .then(function(foto){
                    res.status(201).json(foto);
                }, function(erro){
                    console.log(erro);
                    res.status(500).json(erro);
                });
        }
    };

    return controller;
};
