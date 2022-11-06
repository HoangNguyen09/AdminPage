const Sequelize = require("sequelize");
const sequelize = require("../configs/sequelize.config");
const Movie = require("./movie.model");
const Genre = require("./genre.model");

const GenreMovie = sequelize.define(
    'GenreMovie',
    {
        MovieId: {
            type: Sequelize.INTEGER,
            references: {
                model: Movie,
                key: 'id'
            }
        },
        GenreId: {
            type: Sequelize.INTEGER,
            references: {
                model: Genre,
                key: 'id'
            }
        }
    },
    {
        timestamps: false,
        tableName: 'tb_genre_movie'
    }
);
module.exports = GenreMovie;
