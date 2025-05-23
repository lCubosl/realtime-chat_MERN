// framework, provides features that allows us to build the API faster. gives us routes, middleware, etc...
import express from "express"
import dotenv from "dotenv"

import authRoutes from "./routes/auth.route.js"
import { connectDB } from "./lib/db.js"

dotenv.config()
const app = express()
const PORT = process.env.PORT

app.use("/api/auth", authRoutes)

app.listen(PORT, () => {
  console.log("server is running on port:", PORT)
  connectDB()
})