const db = require("../models");
const PatientFile = db.patientFile;
const Op = db.Sequelize.Op;
const atob = require('atob');
const Blob = require('node-blob');


exports.uploadFile = async (req, res) => {    
    let b64Data = req.body.content.replace(/^data:(image|application)\/(png|jpg|jpeg|pdf);base64,/, "")
    const blob = b64toBlob(b64Data, req.body.mime_type)
    try {
        let response = await PatientFile.create({
            nome: req.body.filename,
            conteudo: blob.buffer,
            tamanho: req.body.size,
            mime_type: req.body.mime_type,
            patient_fk: req.body.pk
        })        
        res.send(response)

    } catch (e) {
        res.status(500).send({
            message: e.message || "Erro ao salvar arquivo."
        })
    }
}

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

function b64toBlob(b64Data, contentType = '', sliceSize = 512) {
    const byteCharacters = atob(b64Data);
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    const blob = new Blob([byteArray], { type: contentType });
    return blob
}