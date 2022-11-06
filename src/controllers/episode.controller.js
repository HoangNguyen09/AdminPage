const EpisodeService = require("../services/episosde.service");

const EpisodeController = {};

EpisodeController.getInformation = (req, res, next) => {
    const id = req.params.id;
    if (id) {
        EpisodeService.getInformation(id)
            .then((rs) => {
                return res.status(200).json(rs);
            })
            .catch((err) => {
                console.log(err);
                return res
                    .status(500)
                    .json({ status: "error", message: "Has a fucking error" });
            });
    } else {
        return res
            .status(400)
            .json({ status: "failed", message: "Missing params" });
    }
};

EpisodeController.createOne = (req, res, next) => {
    const episode = req.body.episode;
    const hls = req.body.hls;
    const idMovie = req.body.idMovie;
    if (episode && hls && idMovie) {
        EpisodeService.createOne({ episode, hls, idMovie })
            .then((rs) => {
                return res.status(200).json(rs);
            })
            .catch((err) => {
                console.log(err);
                return res
                    .status(500)
                    .json({ status: "error", message: "Has a fucking error" });
            });
    } else {
        return res
            .status(400)
            .json({ status: "failed", message: "Missing params" });
    }
};

EpisodeController.addMultiEpisode = (req, res, next) => {
    const idMovie = req.body.idMovie;
    const multi = req.body.multi;
    if (idMovie && multi) {
        const data = {
            idMovie,
            multi
        };
        EpisodeService.addMultiEpisode(data)
            .then((rs) => {
                return res.status(200).json(rs);
            })
            .catch((err) => {
                console.log(err);
                return res
                    .status(500)
                    .json({ status: "error", message: "Has a fucking error" });
            });
    } else {
        return res
            .status(400)
            .json({ status: "failed", message: "Missing params" });
    }
};

EpisodeController.updateOne = (req, res, next) => {
    const id = req.params.id;
    const episode = req.body.episode;
    const hls = req.body.hls;
    if (id && episode && hls) {
        const data = {
            id,
            episode,
            hls
        };
        EpisodeService.updateOne(data)
            .then((rs) => {
                return res.status(200).json(rs);
            })
            .catch((err) => {
                console.log(err);
                return res
                    .status(500)
                    .json({ status: "error", message: "Has a fucking error" });
            });
    } else {
        return res
            .status(400)
            .json({ status: "failed", message: "Missing params" });
    }
};

EpisodeController.deleteOne = (req, res, next) => {
    const id = req.params.id;
    if (id) {
        EpisodeService.deleteOne(id)
            .then((rs) => {
                return res.status(200).json(rs);
            })
            .catch((err) => {
                console.log(err);
                return res
                    .status(500)
                    .json({ status: "error", message: "Has a fucking error" });
            });
    }
};

module.exports = EpisodeController;
