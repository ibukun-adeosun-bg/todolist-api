const User = require("../models/User")
const jwt  = require("jsonwebtoken")

//GET USER INFORMATION
const getOneUser = async (req, res, next) => {
    try {
        const id = req.params.userId
        const user = await User.findOne({ where: { id: id }})
        res.status(200).json(user)
    } catch (err) {
        next(err)
    }
}

//GET ALL USERS
const getAllUsers = async (req, res, next) => {
    try {
        const users = await User.findAll({})
        res.status(200).json(users)
    } catch (err) {
        next(err)
    }
}

//UPDATE USER INFORMATION
const updateUser = async (req, res, next) => {
    try {
        const id = req.params.userId
        const userUpdate = await User.update(req.body, { where: { id: id }})
        res.status(200).json("User Information has been Updated")
    } catch (err) {
        next(err)
    }
}

//DELETE USER INFORMATION
const deleteUser = async (req, res, next) => {
    try {
        const id = req.params.userId
        await User.destroy({ where: { id: id }})
        res.status(200).json("User Information has been Deleted")
    } catch (err) {
        next(err)
    }
}


module.exports = { getOneUser, getAllUsers, updateUser, deleteUser }