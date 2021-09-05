const db = require("../models");
const PatientFile = db.patientFile;
const Op = db.Sequelize.Op;


exports.findAll = async (req, res) => {
    try {
        const pk = req.params.pk
        let result = await PatientFile.findAll({
            where: {
                patient_fk: pk
            }
        })
        res.send(result)
    } catch (e) {
        res.status(500)
            .send({
                message: err.message || "Erro ao buscar os arquivos do paciente."
            })
    }
}