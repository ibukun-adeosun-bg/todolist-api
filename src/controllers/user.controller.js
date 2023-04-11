const jwt  = require("jsonwebtoken")
const bcrypt = require("bcryptjs")
const db = require("../config/dbConfig")

//GET USER INFORMATION
const getOneUser = async (req, res, next) => {
    try {
        const id = req.params.userId
        const user = await db.user.findOne({ where: { id: id }})
        res.status(200).json(user)
    } catch (err) {
        next(err)
    }
}

//GET ALL USERS
const getAllUsers = async (req, res, next) => {
    try {
        const users = await db.user.findAll({})
        res.status(200).json(users)
    } catch (err) {
        next(err)
    }
}

//UPDATE USER INFORMATION
const updateUser = async (req, res, next) => {
    try {
        if (req.body.password) {
            const salt = bcrypt.genSaltSync(10)
            req.body.password = bcrypt.hashSync(req.body.password, salt)
        }
        if (req.body.isAdmin) {
            res.status(401).json("You cannot change your Admin Status")
        }

        const id = req.params.userId
        const userUpdate = await db.user.update(req.body, { where: { id: id }})
        res.status(200).json("User Information has been Updated")
    } catch (err) {
        next(err)
    }
}

//DELETE USER INFORMATION
const deleteUser = async (req, res, next) => {
    try {
        const id = req.params.userId
        await db.user.destroy({ where: { id: id }})
        res.status(200).json("User Information has been Deleted")
    } catch (err) {
        next(err)
    }
}


module.exports = { getOneUser, getAllUsers, updateUser, deleteUser }