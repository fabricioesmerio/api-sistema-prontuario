'use strict';
const jwt = require("jsonwebtoken");

const secret = '__________' + process.env.SECRET;

exports.generateToken = async (data) => {
    return jwt.sign(data, secret, { expiresIn: '30d' });
};

exports.decodeToken = async (token) => {
    var data = await jwt.verify(token, secret);
    return data;
};

exports.authorize = function (req, res, next) {
    var token = req.body.token || req.headers['x-access-token'];
    if (!token) {
        res.status(401).json({
            message: 'Acesso Restrito'
        });
    } else {
        jwt.verify(token, secret, (error, decoded) => {
            if (error) {
                res.status(401).json({
                    message: 'Token inválido'
                });
            } else {
                next();
            }
        });
    }
};