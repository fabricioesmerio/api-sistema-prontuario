
const db = require("../models");
const { QueryTypes } = require('sequelize');
const sequelize = db.sequelize;
const Study = db.study;
const Patient = db.patient;
const Op = db.Sequelize.Op;
const atob = require('atob');
const Blob = require('node-blob');

exports.findOne = (req, res) => {
    const pk = req.params.pk;

    Study.findByPk(pk)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: `Ocorreu um erro ao buscar o Paciente ID ${pk}`
            });
        });
}

exports.findAll = async (req, res) => {
    try {
        let limit = parseInt(req.query.limit);
        let page = parseInt(req.query.page);
        let offset = page ? page * limit : 0;
        let quickSearch = req.query.quickSearch
        let __where = req.query.where
        let replacements = { limit: limit, offset: offset }
        let term = ''
        let WHERE = ''

        __where = JSON.parse(__where)

        console.log('__WHERE ==> ', __where, ' - ', typeof __where, ' - ', __where.start)

        if (quickSearch) {
            quickSearch = quickSearch.split(',')
            Object.assign(replacements, {
                term: quickSearch[1]
            })
            term = quickSearch[0] == 's.pk' ? 's.pk::text' : quickSearch[0]
            WHERE += ` WHERE ${term} ILIKE :term`
        }

        if (__where.start || __where.end) {
            if (WHERE.length > 0) {
                if (__where.start && __where.end) {
                    WHERE += ` AND s.study_datetime BETWEEN '${__where.start}' AND '${__where.end}' `
                } else if (__where.start && !__where.end) {
                    WHERE += ` AND s.study_datetime >= '${__where.start}' `
                } else {
                    WHERE += ` AND s.study_datetime <= '${__where.end}' `
                }
            } else {
                if (__where.start && __where.end) {
                    WHERE += ` WHERE s.study_datetime BETWEEN '${__where.start}' AND '${__where.end}' `
                } else if (__where.start && !__where.end) {
                    WHERE += ` WHERE s.study_datetime >= '${__where.start}' `
                } else {
                    WHERE += ` WHERE s.study_datetime <= '${__where.end}' `
                }
            }
        }

        // if (Object.keys(where).length > 0) {

        // }

        console.log('***********************************************\n\n\n\n')
        // console/log(Object.keys(where).length)
        console.log('term :: ', term, ' - ', quickSearch, ' - ', typeof quickSearch, ' - ', quickSearch.length)
        console.log(replacements)
        console.log('\n\n\n\n ******************************************************')

        let count = await sequelize.query(`SELECT COUNT(*) FROM study s JOIN patient p ON p.pk = s.patient_fk`, {
            raw: false,
            type: QueryTypes.SELECT
        })
        count = count[0]
        count = count.count ? count.count : 0

        
        // ${where.length > 0 ? 'WHERE ' + where[0] + ' ILIKE :term' : ''}

        // ${quickSearch.length > 0 ? ` WHERE ${term} ILIKE :term` : ''}

        let query = await sequelize.query(`
        SELECT * 
        FROM study s 
        JOIN patient p ON p.pk = s.patient_fk
        ${WHERE.length > 0 ? WHERE : ''}
        ORDER BY s.study_datetime 
        DESC OFFSET :offset 
        LIMIT :limit;`, {
            logging: console.log,
            raw: false,
            replacements: replacements,
            type: QueryTypes.SELECT
        })

        res.send({
            query, count
        });
    } catch (error) {
        res.status(500)
            .send({
                message: err.message || "Ocorreu um erro ao buscar os exames."
            })
    }
}

exports.update = async (req, res) => {
    try {
        const data = req.body;
        const pk = req.params;

        console.log(data)

        if (data.laudo_audio) {
        //     // application/octet-stream
            let b64Data = data.laudo_audio
            const blob = b64toBlob(b64Data, 'audio/wav')
            data.laudo_audio = blob.buffer
        }

        const result = await Study.update(
            data,
            { where: pk }
        );
        if (result[0]) res.send({ message: "Registro atualizado com sucesso." });
        else res.send({ message: "Não foi possível atualizar o registro." });
    } catch (error) {
        res.status(500).send({
            message: 'Erro ao atualizar!' + error
        });
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
};