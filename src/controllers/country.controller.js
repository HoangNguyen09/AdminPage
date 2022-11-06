const CountryService = require("../services/country.service");

const CountryController = {};

CountryController.getAll = (req, res, next) => {
    CountryService.getAll()
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

CountryController.createOne = (req, res, next) => {
    const country = req.body.country;
    if (country) {
        CountryService.createOne(country)
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

CountryController.updateOne = (req, res, next) => {
    const id = req.params.id;
    const country = req.body.country;
    if (id && country) {
        const data = {
            id,
            country,
        };
        CountryService.updateOne(data)
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

CountryController.deleteOne = (req, res, next) => {
    const id = req.params.id;
    if (id) {
        CountryService.deleteOne(id)
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

CountryController.getInformation = (req, res, next) => {
    const id = req.params.id;
    if (id) {
        CountryService.getInformation(id)
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

module.exports = CountryController;
