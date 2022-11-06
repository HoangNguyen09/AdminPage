const Sequelize = require("sequelize");
const sequelize = require("../configs/sequelize.config");
const Episode = require("./episode.model");

const Link = sequelize.define(
    'Link',
    {
        link: {
            type: Sequelize.STRING,
            allowNull: false
        },
        server_id: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        episode_id: {
            type: Sequelize.INTEGER,
            allowNull: false
        }
    },
    {
        timestamps: true,
        paranoid: true,
        underscored: true,
        tableName: 'tb_link'
    }
);

module.exports = Link;