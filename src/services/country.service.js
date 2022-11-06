const CountryModel = require("../models/country.model");
const MovieModel = require("../models/movie.model");
const slug = require("slug");

const CountryService = {};

CountryService.getAll = async () => {
    try {
        const countries = await CountryModel.findAll();
        return { status: "success", data: countries };
    } catch (error) {
        throw error;
    }
};

CountryService.getInformation = async (id) => {
    try {
        const country = await CountryModel.findOne({
            where: {
                id
            }
        });
        return { status: "success", data: country };
    } catch (error) {
        throw error;
    }
};

CountryService.createOne = async (country) => {
    try {
        const newCountry = await CountryModel.create({
            name: country,
            slug: slug(country)
        });
        return { status: "success", data: newCountry };
    } catch (error) {
        throw error;
    }
};

CountryService.deleteOne = async (id) => {
    try {
        const movie = await MovieModel.findOne({
            where: {
                country_id: id
            }
        });
        if (movie) return { status: "failed", message: "Country being used" };
        await CountryModel.destroy({ where: { id } });
        return { status: "success" };
    } catch (error) {
        throw error;
    }
};

CountryService.updateOne = async (data) => {
    try {
        await CountryModel.update(
            {
                name: data.country,
                slug: slug(data.country)
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

module.exports = CountryService;
