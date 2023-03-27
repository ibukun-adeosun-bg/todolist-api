const Task = require("../models/Task")

//CREATE A TASK
const createTask = async (req, res, next) => {
    try {
        const info = {
            task_id: req.body.task_id,
            task_description: req.body.task_description,
            due_date: req.body.due_date,
            status: req.body.status ? req.body.status : "pending"
        }
        const newTask = new Task(info)
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
        
    } catch (err) {
        next(err)
    }
}

//GET ALL TASKS
const getAllTasks = async (req, res, next) => {
    
}

//UPDATE A TASK
const updateTask = async (req, res, next) => {
    
}

//DELETE A TASK
const deleteTask = async (req, res, next) => {
    
}


module.exports = { createTask, getTask, getAllTasks, updateTask, deleteTask }