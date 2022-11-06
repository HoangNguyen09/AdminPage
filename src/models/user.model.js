const Sequelize = require("sequelize");
const sequelize = require("../configs/sequelize.config");
const Role = require("./role.model");

const User = sequelize.define(
    'User',
    {
        email: {
            type: Sequelize.STRING,
        },
        username: {
            type: Sequelize.STRING,
            allowNull: false
        },
        password: {
            type: Sequelize.STRING,
            allowNull: false
        },
        avatar: {
            type: Sequelize.STRING,
            defaultValue: "unknow.jpg"
        },
        role_id: {
            type: Sequelize.INTEGER,
            defaultValue: 3
        },
    },
    {
        timestamps: true,
        paranoid: true,
        underscored: true,
        tableName: 'tb_user'
    }
);
User.belongsTo(Role, {
    foreignKey: {
        name: 'role_id'
    },
    onDelete: 'RESTRICT',
    onUpdate: 'RESTRICT'
});
module.exports = User;