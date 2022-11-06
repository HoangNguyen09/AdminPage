const UserService = require("../services/user.service");

const UserController = {};

UserController.loginAdminSite = (req, res, next) => {
    const username = req.body.username;
    const password = req.body.password;
    if (username && password) {
        const data = {
            username,
            password,
        };
        UserService.loginAdminSite(data)
            .then((rs) => {
                if (rs.status == "success") {
                    req.session.user = rs.data.user;
                    req.session.token = rs.data.accessToken;
                }
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
            .json({ status: "failed", message: "Mising params" });
    }
};

UserController.logout = (req, res, next) => {
    req.session.destroy();
    return res.status(200).json({ status: "success" });
};

UserController.login = (req, res, next) => {
    const username = req.body.username;
    const password = req.body.password;
    if (username && password) {
        const data = {
            username,
            password,
        };
        UserService.login(data)
            .then((rs) => {
                if (rs.status == "success") {
                    req.session.user = rs.data.user;
                    req.session.token = rs.data.accessToken;
                }
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
            .json({ status: "failed", message: "Mising params" });
    }
};

UserController.register = (req, res, next) => {
    const username = req.body.username;
    const password = req.body.password;
    if (username && password) {
        const data = {
            username,
            password,
        };
        UserService.register(data)
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
            .json({ status: "failed", message: "Mising params" });
    }
};

UserController.getAll = (req, res, next) => {
    UserService.getAll()
        .then((rs) => {
            return res.status(200).json(rs);
        })
        .catch((err) => {
            return res
                .status(500)
                .json({ status: "error", message: "Has a fucking error" });
        });
};

UserController.getUser = (req, res, next) => {
    const id = req.params.id;
    if (id) {
        UserService.getUser(id)
            .then((rs) => {
                return res.status(200).json(rs);
            })
            .catch((err) => {
                return res
                    .status(500)
                    .json({ status: "error", message: "Has a fucking error" });
            });
    } else {
        return res
            .status(400)
            .json({ status: "failed", message: "Mising params" });
    }
};

UserController.changeRole = (req, res, next) => {
    const idUser = req.params.id;
    const idRole = req.body.idRole;
    if (idUser && idRole) {
        UserService.changeRole(idUser, idRole)
            .then((rs) => {
                return res.status(200).json(rs);
            })
            .catch((err) => {
                return res
                    .status(500)
                    .json({ status: "error", message: "Has a fucking error" });
            });
    } else {
        return res
            .status(400)
            .json({ status: "failed", message: "Mising params" });
    }
};

module.exports = UserController;
