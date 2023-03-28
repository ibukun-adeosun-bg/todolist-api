const Sequelize = require("sequelize")
const db = require("../config/dbConfig")
const Task = require("./Task")

const List = db.define("List", {
    list_description: {
        type: Sequelize.TEXT,
        allowNull: false,
        validate: {
            max: 255
        }
    },
    tags: {
        type: Sequelize.JSON
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
            isIn: [["completed", "pending"]]
        }
    }
})

List.associate = (models) => {
    List.hasMany(models.Task, {
        foreignKey: "task_id",
        onDelete: "cascade"
    })
}


module.exports = List