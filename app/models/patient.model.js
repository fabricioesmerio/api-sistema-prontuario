
module.exports = (sequelize, Sequelize) => {
    const Patient = sequelize.define('patient', {
        pk: {
            type: Sequelize.STRING,
            primaryKey: true
        },
        pat_name: {
            type: Sequelize.STRING
        },
        pat_birthdate: {
            type: Sequelize.STRING
        },
        pat_sex: {
            type: Sequelize.STRING
        },
        password_web: {
            type: Sequelize.INTEGER
        },
        registro: {
            type: Sequelize.INTEGER
        }
    }, {
        freezeTableName: true,
        tableName: 'patient',
        timestamps: false,
    });

    return Patient;
};