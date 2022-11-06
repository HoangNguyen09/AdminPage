const GenreModel = require("../models/genre.model");
const GenreMovie = require("../models/genre.movie.model");
const slug = require("slug");

const GenreService = {};

GenreService.getAll = async () => {
    try {
        const genres = await GenreModel.findAll();
        return { status: "success", data: genres };
    } catch (error) {
        throw error;
    }
};

GenreService.getInformation = async (id) => {
    try {
        const genre = await GenreModel.findOne({
            where: {
                id
            }
        });
        return { status: "success", data: genre };
    } catch (error) {
        throw error;
    }
};

GenreService.createOne = async (genre) => {
    try {
        const newGenre = await GenreModel.create({
            name: genre,
            slug: slug(genre)
        });
        return { status: "success", data: newGenre };
    } catch (error) {
        throw error;
    }
};

GenreService.updateOne = async (data) => {
    try {
        await GenreModel.update(
            {
                name: data.genre,
                slug: slug(data.genre)
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

GenreService.deleteOne = async (id) => {
    try {
        await GenreMovie.destroy({ where: { GenreId: id }, force: true });
        await GenreModel.destroy({ where: { id }, force: true });
        return { status: "success" };
    } catch (error) {
        throw error;
    }
};

GenreService.getGenresOfMovie = async (id) => {
    try {
        const genres = await GenreMovie.findAll({
            where: {
                MovieId: id
            },
            include: [
                {
                    model: GenreModel,
                    attributes: ['id', 'name']
                }
            ]
        });
        return { status: "success", data: genres };
    } catch (error) {
        throw error;
    }
};

module.exports = GenreService;