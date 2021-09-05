module.exports = app => {
    const Patient = require("../controllers/patient.controller");
    const authService = require("../../middleware/auth.service");
    var router = require("express").Router();
    
    router.get('/',  authService.authorize, Patient.findAll);
    router.get('/:pk',  authService.authorize, Patient.findOne);
    router.post('/authenticate', Patient.authenticate);

    app.use("/api/patients", router);
}