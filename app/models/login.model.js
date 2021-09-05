module.exports = (sequelize, Sequelize) => {
    const Login = sequelize.define('login', {
        codlogin: {
            type: Sequelize.INTEGER,
            primaryKey: true
        },
        login: {
            type: Sequelize.STRING
        },
        cryptsenha: {
            type: Sequelize.STRING
        },
        bloqueado: {
            type: Sequelize.BOOLEAN
        },
        codusuario: {
            type: Sequelize.INTEGER
        }
    }, {
        freezeTableName: true,
        tableName: 'login',
        timestamps: false,
    });
    return Login
};