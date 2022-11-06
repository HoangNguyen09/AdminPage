const Sequelize = require("sequelize");
const sequelize = require("../configs/sequelize.config");

const Server = sequelize.define(
    'Server',
    {
        name: {
            type: Sequelize.STRING,
            allowNull: false
        },
        desc: {
            type: Sequelize.STRING,
            allowNull: false
        },
    },
    {
        timestamps: true,
        paranoid: true,
        underscored: true,
        tableName: 'tb_server'
    }
);

module.exports = Server;