module.exports = (sequelize, Sequelize) => {
    const PatientFile = sequelize.define('patient_arquivo', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true
        },
        nome: {
            type: Sequelize.STRING
        },
        conteudo: {
            type: Sequelize.BLOB
        },
        tamanho: {
            type: Sequelize.INTEGER
        },
        patient_fk: {
            type: Sequelize.INTEGER
        },
        mime_type: {
            type: Sequelize.STRING
        }
    }, {
        freezeTableName: true,
        tableName: 'patient_arquivo',
        timestamps: false,
    });

    return PatientFile;
};