module.exports = app => {
    const Study = require("../controllers/study.controller");
    const authService = require("../../middleware/auth.service");
    var router = require("express").Router();
    
    router.get('/:pk', authService.authorize, Study.findOne);
    router.put('/:pk', authService.authorize, Study.update);
    router.get('/', authService.authorize, Study.findAll);
    app.use("/api/studies", router);
}