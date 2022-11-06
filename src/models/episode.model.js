const Sequelize = require("sequelize");
const sequelize = require("../configs/sequelize.config");
const Movie = require("./movie.model");

const Episode = sequelize.define(
    'Episode',
    {
        episode: {
            type: Sequelize.STRING,
            allowNull: false
        },
        hls: {
            type: Sequelize.STRING,
            allowNull: false
        },
        movie_id: {
            type: Sequelize.INTEGER,
            allowNull: false
        }
    },
    {
        timestamps: true,
        paranoid: true,
        underscored: true,
        tableName: 'tb_episode'
    }
);

module.exports = Episode;