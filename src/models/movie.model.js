const Sequelize = require("sequelize");
const sequelize = require("../configs/sequelize.config");
const Country = require("./country.model");
const Status = require("./status.model");
const Year = require("./year.model");
const Type = require("./type.model");
const Genre = require("./genre.model");
const Episode = require("./episode.model");
const Link = require("./link.model");
const Server = require("./server.model");
const GenreMovie = require("./genre.movie.model");

const Movie = sequelize.define(
    'Movie',
    {
        name: {
            type: Sequelize.STRING,
            allowNull: false
        },
        slug: {
            type: Sequelize.STRING,
            allowNull: false
        },
        aka: {
            type: Sequelize.STRING,
            allowNull: false
        },
        content: {
            type: Sequelize.STRING(5000),
            allowNull: false
        },
        thumb: {
            type: Sequelize.STRING,
            allowNull: false
        },
        background: {
            type: Sequelize.STRING,
            allowNull: false
        },
        viewed: {
            type: Sequelize.INTEGER,
            defaultValue: 0
        },
        liked: {
            type: Sequelize.INTEGER,
            defaultValue: 0
        },
        searched: {
            type: Sequelize.INTEGER,
            defaultValue: 0
        },
        year_id: {
            type: Sequelize.INTEGER,
        },
        status_id: {
            type: Sequelize.INTEGER,
            defaultValue: 1
        },
        type_id: {
            type: Sequelize.INTEGER,
        },
        country_id: {
            type: Sequelize.INTEGER,
        },
        new: {
            type: Sequelize.INTEGER,
            defaultValue: 0
        }
    },
    {
        timestamps: true,
        paranoid: true,
        underscored: true,
        tableName: 'tb_movie'
    }
);
Movie.belongsTo(Country, {
    foreignKey: {
        name: 'country_id'
    },
    onDelete: 'RESTRICT',
    onUpdate: 'RESTRICT'
});
Movie.belongsTo(Year, {
    foreignKey: {
        name: 'year_id'
    },
    onDelete: 'RESTRICT',
    onUpdate: 'RESTRICT'
});
Movie.belongsTo(Status, {
    foreignKey: {
        name: 'status_id'
    },
    onDelete: 'RESTRICT',
    onUpdate: 'RESTRICT'
});
Movie.belongsTo(Type, {
    foreignKey: {
        name: 'type_id'
    },
    onDelete: 'RESTRICT',
    onUpdate: 'RESTRICT'
});

Episode.belongsTo(Movie, {
    foreignKey: {
        name: 'movie_id'
    },
    onDelete: 'RESTRICT',
    onUpdate: 'RESTRICT'
});
Movie.hasMany(Episode, {
    foreignKey: {
        name: 'movie_id'
    },
    onDelete: 'RESTRICT',
    onUpdate: 'RESTRICT'
});
Movie.belongsToMany(Genre, { through: GenreMovie });

Episode.hasMany(Link, {
    foreignKey: {
        name: 'episode_id'
    },
    onDelete: 'RESTRICT',
    onUpdate: 'RESTRICT'
});
Link.belongsTo(Episode, {
    foreignKey: {
        name: 'episode_id'
    },
    onDelete: 'RESTRICT',
    onUpdate: 'RESTRICT'
});

Link.belongsTo(Server, {
    foreignKey: {
        name: 'server_id'
    },
    onDelete: 'RESTRICT',
    onUpdate: 'RESTRICT'
});
GenreMovie.belongsTo(Genre, {
    foreignKey: {
        name: 'GenreId'
    },
    onDelete: 'RESTRICT',
    onUpdate: 'RESTRICT'
});


module.exports = Movie;