module.exports = app => {
    const PatientFile = require("../controllers/patient_arquivo.controller");
    const authService = require("../../middleware/auth.service");
    var router = require("express").Router();
    let upload = require('../../config/multer.config')
    
    // router.put('/:pk', authService.authorize, PatientFile.update);
    router.post('/:pk',  authService.authorize , PatientFile.uploadFile);
    router.get('/:pk', authService.authorize, PatientFile.findAll);
    router.delete('/:id', authService.authorize, PatientFile.delete);
    app.use("/api/files", router);
}


// upload.single('file')