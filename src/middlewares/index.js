require("dotenv").config();
const jwt = require("jsonwebtoken");
const createError = require("http-errors");

module.exports = {
    verifyTokenManager: (type) => {
        return (req, res, next) => {
            const token = req.session.token;
            if (!token) {
                return res.redirect('/login');
            }

            jwt.verify(
                token,
                process.env.ACCESS_TOKEN_SECRET,
                (err, payload) => {
                    if (err) return next(createError.Unauthorized());
                    const role = payload.role;

                    switch (type) {
                        case 1:
                            if (role == "Admin") {
                                next();
                                break;
                            }
                            return next(createError.Forbidden());

                        case 2:
                            if (role == "Admin" || role == "Mod") {
                                next();
                                break;
                            }
                            return next(createError.Forbidden());

                        default:
                            return next(createError.Unauthorized());
                    }
                }
            );
        };
    },
    checkRef: (req, res, next) => {
        const ref = req.headers.referer;
        if (ref) {
            const origin = ref.split("//")[1].replace("/", "");
            // console.log(origin);
        }

        next();
    },
};
