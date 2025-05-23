// framework, provides features that allows us to build the API faster. gives us routes, middleware, etc...
import express from "express"
import authRoutes from "./routes/auth.route.js"

const app = express()

app.use("/api/auth", authRoutes)

app.listen(5001, () => {
  console.log("server is running on port 5001")
})