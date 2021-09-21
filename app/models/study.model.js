
module.exports = (sequelize, Sequelize) => {
    const Study = sequelize.define('study', {
        pk: {
            type: Sequelize.STRING,
            primaryKey: true
        },
        patient_fk: {
            type: Sequelize.INTEGER,
        },
        study_datetime: {
            type: Sequelize.DATE
        },
        accession_no: {
            type: Sequelize.STRING
        },
        study_desc: {
            type: Sequelize.STRING
        },
        mods_in_study: {
            type: Sequelize.INTEGER
        },
        laudo_audio: {
            type: Sequelize.BLOB
        },
        laudo_texto: {
            type: Sequelize.STRING
        },
        finaliza_laudo: {
            type: Sequelize.BOOLEAN
        },
        patient: {
            type: Sequelize.VIRTUAL
        }
    }, {
        freezeTableName: true,
        tableName: 'study',
        timestamps: false,
    });

    return Study;
};