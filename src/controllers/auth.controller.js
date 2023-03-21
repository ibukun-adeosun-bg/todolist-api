const bcrypt = require("bcryptjs")
const User = require("../models/User")

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
            return next(createerror(409, "This User is already Registered"))
        }
        const newUser = new User(info)
        await newUser.save(function(err) {
            if (err) {
                res.status(500).json(err)
            } else {
                res.status(200).json("User has been Registered")
            }
        })
    } catch (err) {
        next(err)
    }
}

//LOGIN A PAGE
const login = async (req, res, next) => {
    try {

    } catch (err) {
        next(err)
    }
}


module.exports = { register, login }