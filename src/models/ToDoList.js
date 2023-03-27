const Sequelize = require("sequelize")
const db = require("../config/dbConfig")
const Task = require("./Task")

const List = db.define("List", {
    list_description: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            max: 255
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