const MovieModel = require("../models/movie.model");
const GenreModel = require("../models/genre.model");
const YearModel = require("../models/year.model");
const CountryModel = require("../models/country.model");
const ServerModel = require("../models/server.model");
const TypeModel = require("../models/type.model");
const StatusModel = require("../models/status.model");
const EpisodeModel = require("../models/episode.model");
const UserModel = require("../models/user.model");
const RoleModel = require("../models/role.model");
const LinkModel = require("../models/link.model");

const AdminController = {};

AdminController.home = (req, res) => {
    res.render("");
};

AdminController.getAllMovie = async (req, res) => {
    try {
        const movies = await MovieModel.findAll({
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
        const years = await YearModel.findAll();
        const countries = await CountryModel.findAll();
        const servers = await ServerModel.findAll();
        const types = await TypeModel.findAll();
        const genres = await GenreModel.findAll();
        return res.render("pages/movie", {
            movies,
            years,
            countries,
            servers,
            types,
            genres,
        });
    } catch (error) {
        throw error;
    }
};

AdminController.getMovie = async (req, res) => {
    const id = req.params.id;

    try {
        const movie = await MovieModel.findOne({
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
            ]
        });
        const years = await YearModel.findAll();
        const countries = await CountryModel.findAll();
        const servers = await ServerModel.findAll();
        const types = await TypeModel.findAll();
        const statuses = await StatusModel.findAll();
        return res.render("pages/movie/information", {
            movie,
            years,
            countries,
            servers,
            types,
            statuses,
        });
    } catch (error) {
        throw error;
    }
};

AdminController.getEpisodes = async (req, res) => {
    const id = req.params.id;
    try {
        const movie = await MovieModel.findOne({
            attributes: ['id', 'name'],
            where: {
                id
            },
            include: [
                {
                    model: EpisodeModel,
                    attributes: ['id', 'episode', 'hls']
                },
            ]
        });
        const servers = await ServerModel.findAll();
        let episodes = movie.Episodes;
        episodes.sort((a, b) => {
            return parseInt(a.episode) - parseInt(b.episode);
        });
        return res.render("pages/episode", {
            movie,
            servers,
            episodes
        });
    } catch (error) {
        throw error;
    }
};

AdminController.getAllGenre = async (req, res) => {
    try {
        const genres = await GenreModel.findAll();
        return res.render("pages/genre", { genres });
    } catch (error) {
        throw error;
    }
};

AdminController.getAllYear = async (req, res) => {
    try {
        const years = await YearModel.findAll();
        return res.render("pages/year", { years });
    } catch (error) {
        throw error;
    }
};

AdminController.getAllCountry = async (req, res) => {
    try {
        const countries = await CountryModel.findAll();
        return res.render("pages/country", { countries });
    } catch (error) {
        throw error;
    }
};

AdminController.getAllServer = async (req, res) => {
    try {
        const servers = await ServerModel.findAll();
        return res.render("pages/server", { servers });
    } catch (error) {
        throw error;
    }
};

AdminController.getAllType = async (req, res) => {
    try {
        const types = await TypeModel.findAll();
        return res.render("pages/type", { types });
    } catch (error) {
        throw error;
    }
};

AdminController.getAllUser = async (req, res) => {
    try {
        const users = await UserModel.findAll({
            include: [RoleModel]
        });
        const roles = await RoleModel.findAll();
        return res.render("pages/user", { users, roles });
    } catch (error) {
        throw error;
    }
};

module.exports = AdminController;
