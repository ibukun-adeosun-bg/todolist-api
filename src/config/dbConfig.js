const Sequelize = require("sequelize")
const dotenv = require('dotenv')
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

const db = new Sequelize(
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


module.exports = db