var q = require('q');
var moment = require('moment');
moment.locale("pt-br");

module.exports = function() {
    var controller = {};

    controller.obtemPerfil = function(req, res){
        var dbFunctionsSEC = req.app.get('dbFunctionsSEC');

        dbFunctionsSEC.query('SELECT USUARIOS_PERFIL.USUARIO, ' +
                             'USUARIOS_PERFIL.SISTEMA, ' +
                             'USUARIOS_PERFIL.PERFIL, ' +
                             '(SELECT PERFIL.DESCRICAO FROM PERFIL WHERE PERFIL.SISTEMA = ' + dbFunctionsSEC.escape('CLM') + ' AND PERFIL.PERFIL = USUARIOS_PERFIL.PERFIL) AS DESCRICAO ' +
                             'FROM USUARIOS_PERFIL WHERE USUARIO = ' + dbFunctionsSEC.escape(req.user.USUARIO) + ' AND SISTEMA = ' + dbFunctionsSEC.escape('CLM'), [])
            .then(function(result){
                res.json(result[0]);
            }, function(err){
                console.log(err);
                res.status(500).json(err);
            });
    };

    controller.obtemPermissoes = function(req, res){
        var dbFunctionsSEC = req.app.get('dbFunctionsSEC');

        dbFunctionsSEC.query('SELECT * FROM USUARIOS_PERFIL WHERE USUARIO = ' + dbFunctionsSEC.escape(req.user.USUARIO) + ' AND SISTEMA = ' + dbFunctionsSEC.escape('CLM'), [])
            .then(function(result){
                if(result.length){
                    return dbFunctionsSEC.query('SELECT * FROM ACESSO WHERE PERFIL = ' + dbFunctionsSEC.escape(result[0].PERFIL), []);
                } else {
                    var def = q.defer();
                    def.resolve([]);
                    return def.promise;
                }
            }, function(err){
                console.log(err);
                res.status(500).json(err);
            })
            .then(function(result){
                res.json(result);
            }, function(err){
                console.log(err);
                res.status(500).json(err);
            });
    };

    return controller;
};