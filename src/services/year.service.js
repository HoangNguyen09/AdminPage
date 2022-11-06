const YearModel = require("../models/year.model");
const MovieModel = require("../models/movie.model");
const slug = require("slug");

const YearService = {};

YearService.getAll = async () => {
    try {
        const years = await YearModel.findAll();
        return { status: "success", data: years };
    } catch (error) {
        throw error;
    }
};

YearService.getInformation = async (id) => {
    try {
        const year = await YearModel.findOne({
            where: {
                id
            }
        });
        return { status: "success", data: year };
    } catch (error) {
        throw error;
    }
};

YearService.createOne = async (year) => {
    try {
        const newYear = await YearModel.create({
            name: year,
            slug: slug(year)
        });
        return { status: "success", data: newYear };
    } catch (error) {
        throw error;
    }
};

YearService.updateOne = async (data) => {
    try {
        await YearModel.update(
            {
                name: data.year,
                slug: slug(data.year)
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

YearService.deleteOne = async (id) => {
    try {
        const movie = await MovieModel.findOne({
            where: {
                year_id: id
            }
        });
        if (movie) return { status: "failed", message: "Year being used" };
        await YearModel.destroy({ where: { id } });
        return { status: "success" };
    } catch (error) {
        throw error;
    }
};

module.exports = YearService;
