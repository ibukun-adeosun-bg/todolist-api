const Sequelize = require("sequelize")
const db = require("../config/dbConfig")
const List = require("./ToDoList")

const Task = db.define("Task", {
    task_id: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    task_description: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            max: 255
        }
    },
    due_date: {
        type: Sequelize.DATEONLY,
        allowNull: false
    },
    priority: {
        type: Sequelize.STRING,
        validate: {
            isIn: [["urgent", "not urgent"]]
        }
    },
    status: {
        type: Sequelize.STRING,
        validate: {
            isIn: [['completed', 'pending']]
        }
    }
})


module.exports = Task