const Sequelize = require("sequelize");
const sequelize = require("../configs/sequelize.config");

const Year = sequelize.define(
    'Year',
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
        tableName: 'tb_year'
    }
);

module.exports = Year;