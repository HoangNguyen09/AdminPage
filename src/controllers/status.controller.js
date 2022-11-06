const StatusService = require("../services/status.service");

const StatusController = {};

StatusController.getAll = (req, res, next) => {
    StatusService.getAll()
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

StatusController.getInformation = (req, res, next) => {
    const id = req.params.id;
    if (id) {
        StatusService.getInformation(id)
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

StatusController.createOne = (req, res, next) => {
    const status = req.body.status;
    if (status) {
        StatusService.createOne(status)
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

StatusController.updateOne = (req, res, next) => {
    const id = req.params.id;
    const status = req.body.status;
    if (id && status) {
        const data = {
            id,
            status,
        };
        StatusService.updateOne(data)
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

StatusController.deleteOne = (req, res, next) => {
    const id = req.params.id;
    if (id) {
        StatusService.deleteOne(id)
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

module.exports = StatusController;
