const db = require("../config/dbConfig")

//CREATE A TASK
const createTask = async (req, res, next) => {
    try {
        const info = {
            task_description: req.body.task_description,
            due_date: req.body.due_date,
            priority: req.body.priority ? req.body.priority : "not urgent",
            status: req.body.status ? req.body.status : "pending",
            listId: req.body.listId
        }
        const newTask = new db.task(info)
        await newTask.save()
            .then(() => {
                res.status(200).json("You have created a new Task on this list")
            }).catch(err => {
                res.status(500).json(err)
            })
    } catch (err) {
        next(err)
    }
}

//GET A TASK
const getTask = async (req, res, next) => {
    try {
        const id = req.params.taskId
        const task = await db.task.findOne({ where: { id: id }})
        res.status(200).json(task)
    } catch (err) {
        next(err)
    }
}

//GET ALL TASKS
const getAllTasks = async (req, res, next) => {
    try {
        const tasks = await db.task.findAll({})
        res.status(200).json(tasks)
    } catch (err) {
        next(err)
    }
}

//UPDATE A TASK
const updateTask = async (req, res, next) => {
    try {
        const id = req.params.taskId
        await db.task.update(req.body, { where: { id: id }})
            .then(() => {
                res.status(200).json("Task has been Updated")
            }).catch (err => {
                res.status(500).json(err)
            })
    } catch (err) {
        next(err)
    }
}

//DELETE A TASK
const deleteTask = async (req, res, next) => {
    try {
        const id = req.params.taskId
        await db.task.destroy({ where: { id: id }})
            .then(() => {
                res.status(200).json("Task has been Deleted")
            }).catch(err => {
                res.status(500).json(err)
            })
    } catch (err) {
        next(err)
    }
}


module.exports = { createTask, getTask, getAllTasks, updateTask, deleteTask }