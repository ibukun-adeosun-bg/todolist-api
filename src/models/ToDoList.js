module.exports = (sequelize, Sequelize) => {
    const List = sequelize.define("List", {
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
    
    List.associate = function(model) {
        List.belongsTo(model.user, {
            foreignKey: "userId",
            onDelete: "cascade"
        })
    }

    List.associate = function(model) {
        List.hasMany(model.task, {
            foreignKey: "ListId",
            onDelete: "cascade"
        })
    }

    return List
};