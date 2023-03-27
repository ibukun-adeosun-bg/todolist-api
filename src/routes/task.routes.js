const express = require("express")
const { createTask, getTask, getAllTasks, updateTask, deleteTask } = require("../controllers/task.controller")
const { verifyUser } = require("../utils/verifyToken")
const router = express.Router()

//CREATE A TASK
router.post("/:userId/todolists/:listId/tasks", verifyUser, createTask)

//GET A TASK
router.get("/:userId/todolists/:listId/tasks/:taskId", verifyUser, getTask)

//GET ALL TASKS
router.get("/:userId/todolists/:listId/tasks", verifyUser, getAllTasks)

//UPDATE A TASK
router.put("/:userId/todolists/:listId/tasks/:taskId", verifyUser, updateTask)

//DELETE A TASK
router.delete("/:userId/todolists/:listId/tasks/:taskId", verifyUser, deleteTask)



module.exports = router