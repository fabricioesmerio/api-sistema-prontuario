
module.exports = function (sequelize, DataTypes) {
    var Comment = sequelize.define(
        'Comment', {
        text: {
            type: DataTypes.STRING,
            allowNull: false
        }
    },
        {
            classMethods: {
                associate: function (models) {
                    Comment.belongsTo(models.User, { foreignKey: 'userId' });
                }
            }
        }

    );
    return Comment;
};