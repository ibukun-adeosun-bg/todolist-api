const express = require('express')
const authRoutes = require("./routes/auth.routes")
const userRoutes = require("./routes/user.routes")

const app = express()
app.use("/api/v1/auth", authRoutes)
app.use("/api/v1/users", userRoutes)

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
    console.log(`Backend Server is currently running on port ${PORT}`);
})