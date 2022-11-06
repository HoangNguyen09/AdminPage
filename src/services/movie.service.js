const MovieModel = require("../models/movie.model");
const CountryModel = require("../models/country.model");
const YearModel = require("../models/year.model");
const StatusModel = require("../models/status.model");
const TypeModel = require("../models/type.model");
const GenreModel = require("../models/genre.model");
const EpisodeModel = require("../models/episode.model");
const GenreMovie = require("../models/genre.movie.model");
const LinkModel = require("../models/link.model");
const ServerModel = require("../models/server.model");
const slug = require("slug");

const MovieService = {};

MovieService.getAll = async () => {
    try {
        const movies = await MovieModel.findAll({
            attributes: ['id', 'name', 'slug', 'aka', 'content', 'thumb', 'background', 'viewed', 'liked'],
            include: [
                {
                    model: GenreModel,
                    attributes: ['id', 'name', 'slug']
                },
                {
                    model: CountryModel,
                    attributes: ['id', 'name', 'slug']
                },
                {
                    model: TypeModel,
                    attributes: ['id', 'name', 'slug']
                },
                {
                    model: StatusModel,
                    attributes: ['id', 'name', 'slug']
                },
                {
                    model: YearModel,
                    attributes: ['id', 'name', 'slug']
                },
            ]
        });
        return { status: "success", data: movies };
    } catch (error) {
        throw error;
    }
};

MovieService.createOne = async (data) => {
    try {
        const movie = await MovieModel.create({
            name: data.name,
            slug: slug(data.name),
            aka: data.aka,
            content: data.content,
            thumb: data.thumb,
            background: data.background,
            year_id: data.year,
            type_id: data.type,
            country_id: data.country
        });
        return { status: "success", data: movie };
    } catch (error) {
        throw error;
    }
};

MovieService.updateOne = async (data) => {
    try {
        await MovieModel.update(
            {
                name: data.name,
                slug: slug(data.name),
                aka: data.aka,
                content: data.content,
                thumb: data.thumb,
                background: data.background,
                viewed: data.viewed,
                liked: data.liked,
                year_id: data.year,
                type_id: data.type,
                country_id: data.country,
                status_id: data.status,
            },
            {
                where: {
                    id: data.id
                }
            });
        return { status: "success" };
    } catch (error) {
        throw error;
    }
};

MovieService.delete = async (id) => {
    try {
        await MovieModel.destroy({ where: { id } });
        return { status: "success" };
    } catch (error) {
        throw error;
    }
};

MovieService.getInformation = async (id) => {
    try {
        const movie = await MovieModel.findOne({
            attributes: ['id', 'name', 'slug', 'aka', 'content', 'thumb', 'background', 'viewed', 'liked'],
            where: {
                id
            },
            include: [
                {
                    model: GenreModel,
                    attributes: ['id', 'name', 'slug']
                },
                {
                    model: CountryModel,
                    attributes: ['id', 'name', 'slug']
                },
                {
                    model: TypeModel,
                    attributes: ['id', 'name', 'slug']
                },
                {
                    model: StatusModel,
                    attributes: ['id', 'name', 'slug']
                },
                {
                    model: YearModel,
                    attributes: ['id', 'name', 'slug']
                },
                {
                    model: EpisodeModel,
                    attributes: ['id', 'episode', 'hls'],
                    include: [{
                        model: LinkModel,
                        attributes: ['id', 'link'],
                        include: [{
                            model: ServerModel,
                            attributes: ['id', 'name']
                        }]
                    }]
                },
            ]
        });
        return { status: "success", data: movie };
    } catch (error) {
        throw error;
    }
};

MovieService.addGenre = async (id, idGenre) => {
    try {
        const hasGenre = await GenreMovie.findOne(
            {
                where: {
                    MovieId: id,
                    GenreId: idGenre
                }
            }
        );
        if (hasGenre) return { status: "failed", message: "Genre already exists" };
        await GenreMovie.create({
            MovieId: id,
            GenreId: idGenre
        });
        const genres = await GenreMovie.findAll(
            {
                where: {
                    MovieId: id
                },
                include: [
                    {
                        model: GenreModel,
                        attributes: ['id', 'name']
                    }
                ]
            }
        );
        return { status: "success", data: genres };
    } catch (error) {
        throw error;
    }
};

MovieService.deleteGenre = async (id, idGenre) => {
    try {
        await GenreMovie.destroy(
            {
                where: {
                    MovieId: id,
                    GenreId: idGenre
                }
            }
        );
        return { status: "success" };
    } catch (error) {
        throw error;
    }
};

module.exports = MovieService;
