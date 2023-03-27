const List = require("../models/ToDoList")

//CREATE A TO DO LIST
const createList = async (req, res, next) => {
    try {
        const info = {
            list_id: req.body.list_id,
            list_description: req.body.list_description
        }
        const newList = new List(info)
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
        const id = req.params.listId
        console.log(id);
        const list = await List.findOne({ where: { id: id }})
        res.status(200).json(list)
    } catch (err) {
        next(err)
    }
}

//GET ALL TO DO LISTS FOR A USER
const getAllLists = async (req, res, next) => {
    try {
        const lists = await List.findAll({})
        res.status(200).json(lists)
    } catch (err) {
        next(err)
    }
}

//UPDATE A TO DO LIST
const updateList = async (req, res, next) => {
    try {
        const id = req.params.listId
        await List.update(req.body, { where: { id: id }})
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
        await List.destroy({ where: { id: id }})
            .then(() => {
                res.status(200).json("List Information has been deleted")
            })
    } catch (err) {
        next(err)
    }
}


module.exports = { createList, getList, getAllLists, updateList, deleteList }