const YearService = require("../services/year.service");

const YearController = {};

YearController.getAll = (req, res, next) => {
    YearService.getAll()
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

YearController.getInformation = (req, res, next) => {
    const id = req.params.id;
    if (id) {
        YearService.getInformation(id)
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

YearController.createOne = (req, res, next) => {
    const year = req.body.year;
    if (year) {
        YearService.createOne(year)
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

YearController.updateOne = (req, res, next) => {
    const id = req.params.id;
    const year = req.body.year;
    if (id && year) {
        const data = {
            id,
            year,
        };
        YearService.updateOne(data)
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

YearController.deleteOne = (req, res, next) => {
    const id = req.params.id;
    if (id) {
        YearService.deleteOne(id)
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

module.exports = YearController;
