const Sequelize = require("sequelize");
const sequelize = require("../configs/sequelize.config");

const Status = sequelize.define(
    'Status',
    {
        name: {
            type: Sequelize.STRING,
            allowNull: false
        },
        slug: {
            type: Sequelize.STRING,
            allowNull: false
        }
    },
    {
        timestamps: true,
        paranoid: true,
        underscored: true,
        tableName: 'tb_status'
    }
);

module.exports = Status;