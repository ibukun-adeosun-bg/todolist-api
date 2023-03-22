const jwt = require("jsonwebtoken")
const { createError } = require("./error")

//Verifying the token generated in the login Page
const verifyToken = async (req, res, next) => {
    const authHeader = req.headers.token
    if (authHeader) {
        const token = authHeader.split(" ")[1]
        jwt.verify(
            token,
            process.env.JWT_SEC,
            (err, user) => {
                if (err) return next(createError(403, "Your Token is Invalid"))
                req.user = user
                next();
            }
        );
    } else {
        res.status(401).json("You are not Authentictaed yet")
    }
}

//Verifying the User after verifying the token
const verifyUser = async (req, res, next) => {
    verifyToken(req, res, next, () => {
        if (req.user.id === req.params.id || req.params.isAdmin) {
            next();
        } else {
            res.status(401).json("You are not Authorized to do this")
        }
    })
}

//Verifying if the user is an admin user or a general user
const verifyAdmin = async (req, res, next) => {
    verifyToken(req, res, next, () => {
        if (req.user.isAdmin) {
            next();
        } else {
            res.status(200).json("You are not an Admin, so you are not Authorized to do this")
        }
    });
}