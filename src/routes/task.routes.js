const express = require("express")
const multer = require("multer")
const upload = multer({ dest: 'uploads/' });
const bodyParser = require("body-parser")
const { createTask, getTask, getAllTasks, updateTask, deleteTask } = require("../controllers/task.controller")
const { verifyUser } = require("../utils/verifyToken")
const router = express.Router()

//CREATE A TASK
router.post("/:userId/todolists/:listId/tasks", upload.single("file"), bodyParser.urlencoded({ extended: true }), verifyUser, createTask)

//GET A TASK OF A PARTICULAR LIST
router.get("/:userId/todolists/:listId/tasks/:taskId", verifyUser, getTask)

//GET ALL TASKS OF A PARTICULAR LIST
router.get("/:userId/todolists/:listId/tasks", verifyUser, getAllTasks)

//UPDATE A TASK
router.put("/:userId/todolists/:listId/tasks/:taskId", upload.single("file"), bodyParser.urlencoded({ extended: true }), verifyUser, updateTask)

//DELETE A TASK
router.delete("/:userId/todolists/:listId/tasks/:taskId", verifyUser, deleteTask)



module.exports = router