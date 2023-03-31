module.exports = (sequelize, Sequelize) => {
    const Task = sequelize.define("Task", {
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
    Task.associate = function(list) {
        Task.belongsTo(list, {
            foreignKey: "ListId",
            onDelete: "cascade"
        })
    }

    return Task
}