const StatusModel = require("../models/status.model");
const MovieModel = require("../models/movie.model");
const slug = require("slug");

const StatusService = {};

StatusService.getAll = async () => {
    try {
        const statuses = await StatusModel.findAll();
        return { status: "success", data: statuses };
    } catch (error) {
        throw error;
    }
};

StatusService.getInformation = async (id) => {
    try {
        const status = await StatusModel.findOne({
            where: {
                id
            }
        });
        return { status: "success", data: status };
    } catch (error) {
        throw error;
    }
};

StatusService.createOne = async (status) => {
    try {
        const newStatus = await StatusModel.create({
            name: status,
            slug: slug(status)
        });
        return { status: "success", data: newStatus };
    } catch (error) {
        throw error;
    }
};

StatusService.updateOne = async (data) => {
    try {
        await StatusModel.update(
            {
                name: data.status,
                slug: slug(data.status)
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

StatusService.deleteOne = async (id) => {
    try {
        const movie = await MovieModel.findOne({
            where: {
                status_id: id
            }
        });
        if (movie) return { status: "failed", message: "Status being used" };
        await StatusModel.destroy({ where: { id } });
        return { status: "success" };
    } catch (error) {
        throw error;
    }
};

module.exports = StatusService;
