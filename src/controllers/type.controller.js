const TypeService = require("../services/type.service");

const TypeController = {};

TypeController.getAll = (req, res, next) => {
    TypeService.getAll()
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

TypeController.getInformation = (req, res, next) => {
    const id = req.params.id;
    if (id) {
        TypeService.getInformation(id)
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

TypeController.createOne = (req, res, next) => {
    const type = req.body.type;
    if (type) {
        TypeService.createOne(type)
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

TypeController.updateOne = (req, res, next) => {
    const id = req.params.id;
    const type = req.body.type;
    if (id && type) {
        const data = {
            id,
            type,
        };
        TypeService.updateOne(data)
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

TypeController.deleteOne = (req, res, next) => {
    const id = req.params.id;
    if (id) {
        TypeService.deleteOne(id)
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

module.exports = TypeController;
