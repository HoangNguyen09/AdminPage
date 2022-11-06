const LinkService = require("../services/link.service");

const LinkController = {};

LinkController.getFullLink = (req, res, next) => {
    const id = req.params.idEpisode;
    if (id) {
        LinkService.getFullLink(id)
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

LinkController.getInformation = (req, res, next) => {
    const id = req.params.id;
    if (id) {
        LinkService.getInformation(id)
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

LinkController.createOne = (req, res, next) => {
    const link = req.body.link;
    const idEpisode = req.body.idEpisode;
    const idServer = req.body.idServer;
    if (link && idEpisode && idServer) {
        LinkService.createOne({ link, idEpisode, idServer })
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

LinkController.updateOne = (req, res, next) => {
    const id = req.params.id;
    const link = req.body.link;
    if (id && link) {
        const data = {
            id,
            link,
        };
        LinkService.updateOne(data)
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

LinkController.deleteOne = (req, res, next) => {
    const id = req.params.id;
    if (id) {
        LinkService.deleteOne(id)
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

module.exports = LinkController;
