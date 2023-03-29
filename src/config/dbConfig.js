const Sequelize = require("sequelize")
const dotenv = require('dotenv');
dotenv.config();

const configDetails = {
    HOST: "localhost",
    USER: "root",
    PASSWORD: process.env.PASSWORD,
    DATABASE: "todolistdb",
    DIALECT: 'mysql',
    POOL: {
        MAX: 5,
        MIN: 0,
        ACQUIRE: 30000,
        IDLE: 10000
    }
}

const sequelize = new Sequelize(
    configDetails.DATABASE,
    configDetails.USER,
    configDetails.PASSWORD, {
        host: configDetails.HOST,
        dialect: configDetails.DIALECT,
        pool: {
            max: configDetails.POOL.MAX,
            min: configDetails.POOL.MIN,
            acquire: configDetails.POOL.ACQUIRE,
            idle: configDetails.POOL.IDLE
        }
    }
);

const db = {}
db.sequelize = sequelize;
db.Sequelize = Sequelize;

const User = require("../models/User.js")(sequelize, Sequelize)
const List = require("../models/ToDoList.js")(sequelize, Sequelize)
const Task = require("../models/Task.js")(sequelize, Sequelize)

List.belongsTo(User)
Task.belongsTo(List)

db.user = User
db.list = List
db.task = Task

module.exports = db