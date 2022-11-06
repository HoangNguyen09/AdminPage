const Sequelize = require("sequelize");
const sequelize = require("../configs/sequelize.config");

const Type = sequelize.define(
    'Type',
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
        tableName: 'tb_type'
    }
);

module.exports = Type;