const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const User = require("../models/User")
const { createError } = require("../utils/error")

//REGISTER A PAGE
const register = async (req, res, next) => {
    try {
        const salt = bcrypt.genSaltSync(10)
        const hashedPassword = bcrypt.hashSync(req.body.password, salt)
        const info = {
            username: req.body.username,
            email: req.body.email,
            password: hashedPassword,
            isAdmin: req.body.isAdmin ? req.body.isAdmin : false
        }
        const alreadyExistsUser = await User.findOne({ where: {email: req.body.email}})
        if (alreadyExistsUser) {
            return next(createError(409, "This User is already Registered"))
        }
        const newUser = new User(info)
        await newUser.save()
            .then(() => {
                res.status(200).json("User has been Registered")
            }).catch (err => {
                res.status(500).json(err)
            })
    } catch (err) {
        next(err)
    }
}

//LOGIN A PAGE
const login = async (req, res, next) => {
    try {
        const user = await User.findOne({ where: {email: req.body.email }})
        if (!user) return next(createError(404, "User not found!!!"))

        const isPasswordCorrect = bcrypt.compareSync(req.body.password, user.password)
        if (!isPasswordCorrect) return next(createError(403, "Username and Password don't match"))

        const accessToken = jwt.sign(
            {
                id: user.id,
                isAdmin: user.isAdmin
            },
            process.env.JWT_SEC,
            { expiresIn: "30d" }
        )

        res.status(200).json({
            message: "You are now logged in",
            id: user.id,
            isAdmin: user.isAdmin,
            token: accessToken
        })
    } catch (err) {
        next(err)
    }
}


module.exports = { register, login }