module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define("user", {
        username: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: true
        },
        email: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: true
        },
        password: {
            type: Sequelize.STRING,
            allowNull: false
        },
        isAdmin: {
            type: Sequelize.BOOLEAN
        }
    });
    
    User.associate = function(model) {
        User.hasMany(model.list, {
            foreignKey: "userId",
            onDelete: "cascade"
        })
    }
    return User
}
