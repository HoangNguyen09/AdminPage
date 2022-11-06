const Sequelize = require("sequelize");
const sequelize = require("../configs/sequelize.config");

const Role = sequelize.define(
    'Role',
    {
        name: {
            type: Sequelize.STRING,
            allowNull: false
        }
    },
    {
        timestamps: true,
        paranoid: true,
        underscored: true,
        tableName: 'tb_role'
    }
);

module.exports = Role;