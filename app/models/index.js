const config = require("../../config/config");

const Sequelize = require("sequelize");

const sequelize = new Sequelize(config.DB, config.USER, config.PASSWORD, {
    host: config.HOST,
    port: config.PORT,
    dialect: config.dialect,
    operatorsAliases: false,
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.patient = require("./patient.model.js")(sequelize, Sequelize);
db.study = require("./study.model.js")(sequelize, Sequelize);
db.login = require("./login.model.js")(sequelize, Sequelize);
db.patientFile = require("./patient_arquivo.model")(sequelize, Sequelize);

module.exports = db;