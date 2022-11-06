const MovieService = require("../services/movie.service");

const MovieController = {};

MovieController.getAll = (req, res, next) => {
    MovieService.getAll()
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

MovieController.createOne = (req, res, next) => {
    const name = req.body.name;
    const aka = req.body.aka;
    const content = req.body.content;
    const thumb = req.body.thumb;
    const background = req.body.background;
    const year = req.body.year;
    const country = req.body.country;
    const type = req.body.type;

    if (
        thumb &&
        background &&
        name &&
        aka &&
        content &&
        year &&
        country &&
        type
    ) {
        const data = {
            name,
            aka,
            content,
            thumb,
            background,
            year,
            country,
            type,
        };
        MovieService.createOne(data)
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

MovieController.updateOne = (req, res, next) => {
    const id = req.params.id;
    const name = req.body.name;
    const aka = req.body.aka;
    const content = req.body.content;
    const thumb = req.body.thumb;
    const background = req.body.background;
    const year = req.body.year;
    const country = req.body.country;
    const type = req.body.type;
    const status = req.body.status;
    const viewed = req.body.viewed;
    const liked = req.body.liked;
    if (
        thumb &&
        background &&
        name &&
        aka &&
        content &&
        year &&
        country &&
        type &&
        status &&
        viewed &&
        liked
    ) {
        const data = {
            name,
            aka,
            content,
            thumb,
            background,
            year,
            country,
            type,
            status,
            viewed,
            liked,
            id,
        };

        MovieService.updateOne(data)
            .then((rs) => {
                res.status(200).json(rs);
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

MovieController.delete = (req, res, next) => {
    const id = req.params.id;
    if (id) {
        MovieService.delete(id)
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

MovieController.getInformation = (req, res, next) => {
    const id = req.params.id;
    if (id) {
        MovieService.getInformation(id)
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

MovieController.addGenre = (req, res, next) => {
    const id = req.body.idMovie;
    const idGenre = req.body.idGenre;
    if (id) {
        MovieService.addGenre(id, idGenre)
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

MovieController.deleteGenre = (req, res, next) => {
    const id = req.params.idMovie;
    const idGenre = req.params.idGenre;
    if (id) {
        MovieService.deleteGenre(id, idGenre)
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

module.exports = MovieController;
