const express = require('express')
const { getOneUser, getAllUsers, updateUser, deleteUser } = require('../controllers/user.controller')
const { verifyUser, verifyAdmin } = require('../utils/verifyToken')
const router = express.Router()

//GET USER INFORMATION
router.get("/:userId", verifyUser, getOneUser)

//GET ALL USERS
router.get("/", verifyAdmin, getAllUsers)

//UPDATE USER INFORMATION
router.put("/:userId", verifyUser, updateUser)

//DELETE USER INFORMATION
router.delete("/:userId", verifyUser, deleteUser)



module.exports = router