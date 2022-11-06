const ServerService = require("../services/server.service");

const ServerController = {};

ServerController.getAll = (req, res, next) => {
    ServerService.getAll()
        .then((rs) => {
            return res.status(200).json(rs);
        })
        .catch((err) => {
            console.log(err);
            return res
                .status(500)
                .json({ status: "error", message: "Has a fucking error" });
        });
};

ServerController.createOne = (req, res, next) => {
    const server = req.body.server;
    const desc = req.body.desc;
    if (server && desc) {
        const data = {
            server,
            desc,
        };
        ServerService.createOne(data)
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

ServerController.updateOne = (req, res, next) => {
    const id = req.params.id;
    const server = req.body.server;
    const desc = req.body.desc;
    if (id && server && desc) {
        const data = {
            id,
            server,
            desc,
        };
        ServerService.updateOne(data)
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

ServerController.deleteOne = (req, res, next) => {
    const id = req.params.id;
    if (id) {
        ServerService.deleteOne(id)
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

ServerController.getInformation = (req, res, next) => {
    const id = req.params.id;
    if (id) {
        ServerService.getInformation(id)
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

module.exports = ServerController;
