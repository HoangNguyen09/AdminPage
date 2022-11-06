const ServerModel = require("../models/server.model");
const LinkModel = require("../models/link.model");

const ServerService = {};

ServerService.getAll = async () => {
    try {
        const servers = await ServerModel.findAll();
        return { status: "success", data: servers };
    } catch (error) {
        throw error;
    }
};

ServerService.getInformation = async (id) => {
    try {
        const server = await ServerModel.findOne({
            where: {
                id
            }
        });
        return { status: "success", data: server };
    } catch (error) {
        throw error;
    }
};

ServerService.createOne = async (data) => {
    try {
        const newServer = await ServerModel.create({
            name: data.server,
            desc: data.desc
        });
        return { status: "success", data: newServer };
    } catch (error) {
        throw error;
    }
};

ServerService.updateOne = async (data) => {
    try {
        await ServerModel.update(
            {
                name: data.server,
                desc: data.desc
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

ServerService.deleteOne = async (id) => {
    try {
        await LinkModel.destroy({ where: { server_id: id }, force: true });
        await ServerModel.destroy({ where: { id }, force: true });
        return { status: "success" };
    } catch (error) {
        throw error;
    }
};

module.exports = ServerService;
