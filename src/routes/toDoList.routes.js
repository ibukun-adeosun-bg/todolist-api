const express = require("express")
const { createList, getList, getAllLists, updateList, deleteList } = require("../controllers/toDoList.controller")
const { verifyUser } = require("../utils/verifyToken")
const router = express.Router()

//CREATE A TO DO LIST
router.post("/:userId/todolists", verifyUser, createList)

//GET A TO DO LIST
router.get("/:userId/todolists/:listId", verifyUser, getList)

//GET ALL TO DO LISTS
router.get("/:userId/todolists", verifyUser, getAllLists)

//UPDATE A TO DO LIST
router.put("/:userId/todolists/:listId", verifyUser, updateList)

//DELETE A TO DO LIST
router.delete("/:userId/todolists/:listId", verifyUser, deleteList)



module.exports = router