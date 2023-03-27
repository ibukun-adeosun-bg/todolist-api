const express = require('express')
const morgan = require("morgan")
const helmet = require("helmet")
const cors = require("cors")
const db = require('./config/dbConfig')
const authRoutes = require("./routes/auth.routes")
const userRoutes = require("./routes/user.routes")
const toDoListRoutes = require('./routes/toDoList.routes')

db.authenticate()
    .then(() => {
        console.log("Database Connection Successful");
    }).catch (err => {
        console.log(err);
    })

db.sync({ force: false })
    .then(() => {
        console.log("Yes Resyncing to the database has been done");
    }).catch (err => {
        console.log(err);
    })

const app = express()
app.use(express.json())
app.use(helmet())
app.use(cors())
app.use(morgan("dev"))
app.use("/api/v1/auth", authRoutes)
app.use("/api/v1/users", userRoutes)
app.use("/api/v1/users", toDoListRoutes)
app.use((err, req, res, next) => {
    const errorStatus = err.status || 500
    const errorMessage = err.message || "Something went wrong with the Server"
    return res.status(errorStatus).json({
        success: false,
        status: errorStatus,
        message: errorMessage,
        stack: err.stack
    });
});

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
    console.log(`Backend Server is currently running on port ${PORT}`);
})