module.exports = app => {
    const PatientFile = require("../controllers/patient_arquivo.controller");
    const authService = require("../../middleware/auth.service");
    var router = require("express").Router();
    
    // router.put('/:pk', authService.authorize, PatientFile.update);
    // router.post('/:pk', authService.authorize, PatientFile.create);
    router.get('/:pk', authService.authorize, PatientFile.findAll);
    app.use("/api/files", router);
}