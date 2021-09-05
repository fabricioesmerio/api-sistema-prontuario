const db = require("../models");
const Login = db.login;
const Op = db.Sequelize.Op;
var md5 = require("md5");
const authService = require("../../middleware/auth.service");

exports.authenticate = async (req, res) => {
    const objAuth = req.body;

    try {
        const login = await Login.findOne({
            where: {
                login: objAuth.login
            }
        });
        if (!login || (
            md5(objAuth.cryptsenha) != login.cryptsenha
        )) {
            res.status(403).send({
                message: 'Usuário e/ou senha inválidos.'
            });
        }

        if (login.bloqueado) {
            res.status(403).send({
                message: 'Acesso não permitido com esse usuário.'
            });
        }

        const token = await authService.generateToken({
            id: login.codlogin,
            login: login.login
        });

        // OK, gerar token
        res.json({
            message: 'Acesso liberado!',
            token: token
        });
    } catch (error) {
        res.status(500).send({
            message: error.message
        })
    }
};

exports.findOne = (req, res) => {
    res.send({
        "message": "Olá"
    });
}