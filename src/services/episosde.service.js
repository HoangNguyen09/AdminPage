const EpisodeModel = require("../models/episode.model");
const LinkModel = require("../models/link.model");
const { convertMulti } = require("../utils");

const EpisodeService = {};

EpisodeService.getInformation = async (id) => {
    try {
        const episode = await EpisodeModel.findOne({
            where: {
                id
            }
        });
        return { status: "success", data: episode };
    } catch (error) {
        throw error;
    }
};

EpisodeService.createOne = async (data) => {
    try {
        const hasEpisode = await EpisodeModel.findOne({
            where: {
                episode: data.episode,
                movie_id: data.idMovie
            }
        });
        if (hasEpisode) return { status: "failed", message: "Episode already exists" };
        const newEpisode = await EpisodeModel.create({
            episode: data.episode,
            hls: data.hls,
            movie_id: data.idMovie
        });
        return { status: "success", data: newEpisode };
    } catch (error) {
        throw error;
    }
};

EpisodeService.addMultiEpisode = async (data) => {
    try {
        const arrEps = convertMulti(data.multi, data.idMovie);
        for (const episode of arrEps) {
            const hasEpisode = await EpisodeModel.findOne({
                where: {
                    episode: episode.episode,
                    movie_id: data.idMovie
                }
            });
            if (!hasEpisode) {
                await EpisodeModel.create({
                    episode: episode.episode,
                    hls: episode.hls,
                    movie_id: episode.movie_id
                });
            }
        }
        const episodes = await EpisodeModel.findAll({
            where: {
                movie_id: data.idMovie
            }
        });
        episodes.sort((a, b) => {
            return parseInt(a.episode) - parseInt(b.episode);
        });
        return { status: "success", data: episodes };
    } catch (error) {
        throw error;
    }
};

EpisodeService.updateOne = async (data) => {
    try {
        await EpisodeModel.update(
            {
                episode: data.episode,
                hls: data.hls,
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

EpisodeService.deleteOne = async (id) => {
    try {
        await LinkModel.destroy({ where: { episode_id: id }, force: true });
        await EpisodeModel.destroy({ where: { id }, force: true });
        return { status: "success" };
    } catch (error) {
        throw error;
    }
};

module.exports = EpisodeService;
