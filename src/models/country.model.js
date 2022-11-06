const Sequelize = require("sequelize");
const sequelize = require("../configs/sequelize.config");

const Country = sequelize.define(
    'Country',
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
        tableName: 'tb_country'
    }
);

module.exports = Country;