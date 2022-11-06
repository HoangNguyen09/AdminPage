const Sequelize = require("sequelize");
const sequelize = require("../configs/sequelize.config");
const GenreMovie = require("./genre.movie.model");
const Movie = require("./movie.model");

const Genre = sequelize.define(
    'Genre',
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
        tableName: 'tb_genre'
    }
);

module.exports = Genre;