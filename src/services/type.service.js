const TypeModel = require("../models/type.model");
const MovieModel = require("../models/movie.model");
const slug = require("slug");

const TypeService = {};

TypeService.getAll = async () => {
    try {
        const types = await TypeModel.findAll();
        return { status: "success", data: types };
    } catch (error) {
        throw error;
    }
};

TypeService.getInformation = async (id) => {
    try {
        const type = await TypeModel.findOne({
            where: {
                id
            }
        });
        return { status: "success", data: type };
    } catch (error) {
        throw error;
    }
};

TypeService.createOne = async (type) => {
    try {
        const newType = await TypeModel.create({
            name: type,
            slug: slug(type)
        });
        return { status: "success", data: newType };
    } catch (error) {
        throw error;
    }
};

TypeService.updateOne = async (data) => {
    try {
        await TypeModel.update(
            {
                name: data.type,
                slug: slug(data.type)
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

TypeService.deleteOne = async (id) => {
    try {
        const movie = await MovieModel.findOne({
            where: {
                type_id: id
            }
        });
        if (movie) return { status: "failed", message: "Type being used" };
        await TypeModel.destroy({ where: { id } });
        return { status: "success" };
    } catch (error) {
        throw error;
    }
};

module.exports = TypeService;
