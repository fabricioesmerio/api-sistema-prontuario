module.exports = app => {
    const Login = require("../controllers/login.controller");
    var router = require("express").Router();

    router.post('/', Login.authenticate);
    app.use('/api/authenticate', router)
}