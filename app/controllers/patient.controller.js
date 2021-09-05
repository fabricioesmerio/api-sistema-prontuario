const db = require("../models");
const Patient = db.patient;
const Op = db.Sequelize.Op;
const authService = require("../../middleware/auth.service");

// https://grokonez.com/angular-client-side-pagination-with-nodejs-mysql

exports.findAll = async (req, res) => {
    console.log('findAll :: REQ :: BODY', req.query);
    let limit = parseInt(req.query.limit);
    let page = parseInt(req.query.page);
    let offset = page ? page * limit : 0;
    // console.log('findAll :: REQ :: QUERY', req.query);
    // const title = req.query.title;
    // var condition = title ? { title: { [Op.iLike]: `%${title}%` } } : null;
    try {
        let { count, rows } = await Patient.findAndCountAll({
            limit: limit,
            offset: offset
        });

        // let data = { count, data };
        res.send({ count, rows });
    } catch (error) {
        res.status(500)
            .send({
                message: err.message || "Ocorreu um erro ao buscar os Pacientes."
            })

    }
};

exports.findOne = async (req, res) => {
    const pk = req.params.pk;
    if (!pk) { res.send({ message: 'Informe o identificador para acessar um paciente' }); }
    try {
        let data = await Patient.findByPk(pk);
        res.send(data);
    } catch (error) {
        res.status(500).send(err);
    }
};

exports.authenticate = async (req, res) => {
    let authData = req.body || req.query;
    console.log(authData);
    if (!authData || !authData.registro || !authData.password_web) res.status(403).send({ message: "Credenciais não informadas corretamente!" });
    let user = await Patient.findOne({
        where: { registro: authData.registro }
    });
    if (!user) res.status(403).send({ message: "As credenciais informadas são inválidas" });
    if (user.password_web != authData.password_web) res.status(403).send({ message: "As credenciais informadas são inválidas." })
    else {
        const token = await authService.generateToken({
            id: authData.pk
        });
        res.send(
            {
                message: "Autenticação realizada com sucesso.",
                token: token
            }
        )
    }

};