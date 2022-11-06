const RoleService = require("../services/role.service");

const RoleController = {};

RoleController.getAll = (req, res, next) => {
    RoleService.getAll()
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

RoleController.getInformation = (req, res, next) => {
    const id = req.params.id;
    if (id) {
        RoleService.getInformation(id)
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

RoleController.createOne = (req, res, next) => {
    const role = req.body.role;
    if (role) {
        RoleService.createOne(role)
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

RoleController.updateOne = (req, res, next) => {
    const id = req.params.id;
    const role = req.body.role;
    if (id && role) {
        const data = {
            id,
            role,
        };
        RoleService.updateOne(data)
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

RoleController.deleteOne = (req, res, next) => {
    const id = req.params.id;
    if (id) {
        RoleService.deleteOne(id)
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

module.exports = RoleController;
