const LinkModel = require("../models/link.model");
const ServerModel = require("../models/server.model");

const LinkService = {};

LinkService.getFullLink = async (id) => {
    try {
        const links = await LinkModel.findAll({
            where: {
                episode_id: id
            },
            include: [{
                model: ServerModel,
                attributes: ['id', 'name']
            }]
        });
        return { status: "success", data: links };
    } catch (error) {
        throw error;
    }
};

LinkService.getInformation = async (id) => {
    try {
        const link = await LinkModel.findOne({
            where: {
                id
            }
        });
        return { status: "success", data: link };
    } catch (error) {
        throw error;
    }
};

LinkService.createOne = async (data) => {
    try {
        const hasLink = await LinkModel.findOne({
            where: {
                episode_id: data.idEpisode,
                server_id: data.idServer,
            }
        });
        if (hasLink) return { status: "failed", message: "Link already exists" };
        const newLink = await LinkModel.create({
            link: data.link,
            episode_id: data.idEpisode,
            server_id: data.idServer,
        });
        const link = await LinkModel.findOne({
            where: {
                id: newLink.id
            },
            attributes: ['id', 'link'],
            include: [{
                model: ServerModel,
                attributes: ['id', 'name']
            }]
        })
        return { status: "success", data: link };
    } catch (error) {
        throw error;
    }
};

LinkService.updateOne = async (data) => {
    try {
        await LinkModel.update(
            {
                link: data.link,
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

LinkService.deleteOne = async (id) => {
    try {
        await LinkModel.destroy({ where: { id }, force: true });
        return { status: "success" };
    } catch (error) {
        throw error;
    }
};

module.exports = LinkService;
