const db = require("../config/dbConfig")

//CREATE A TO DO LIST
const createList = async (req, res, next) => {
    try {
        const info = {
            list_description: req.body.list_description,
            tags: req.body.tags ? req.body.tags : [],
            priority: req.body.priority ? req.body.priority : "not urgent",
            status: req.body.status ? req.body.status : "pending",
            userId: req.body.userId
        }
        const newList = new db.list(info)
        await newList.save()
            .then(() => {
                res.status(200).json("A New To Do List has been Created")
            }).catch(err => {
                res.status(500).json(err)
            })
    } catch (err) {
        next(err)
    }
}

//GET A TO DO LIST OF A USER
const getList = async (req, res, next) => {
    try {
        const userId = req.params.userId
        const listId = req.params.listId
        const list = await db.list.findOne(
            { where: { id: listId, userId: userId }},
            { include: { model: db.task } }
        )
        res.status(200).json(list)
    } catch (err) {
        next(err)
    }
}

//GET ALL TO DO LISTS FOR A USER
const getAllLists = async (req, res, next) => {
    try {
        const lists = await db.list.findAll({
            include: { model: db.task }
        })
        res.status(200).json(lists)
    } catch (err) {
        next(err)
    }
}

//UPDATE A TO DO LIST
const updateList = async (req, res, next) => {
    try {
        const id = req.params.listId
        await db.list.update(req.body, { where: { id: id }})
            .then(() => {
                res.status(200).json("List Information has been Updated")
            }).catch(err => {
                res.status(500).json(err)
            })
    } catch (err) {
        next(err)
    }
}

//DELETE A TO DO LIST
const deleteList = async (req, res, next) => {
    try {
        const id = req.params.listId
        await db.list.destroy({ where: { id: id }})
            .then(() => {
                res.status(200).json("List Information has been deleted")
            }).catch(err => {
                res.status(500).json(err)
            })
    } catch (err) {
        next(err)
    }
}


module.exports = { createList, getList, getAllLists, updateList, deleteList }