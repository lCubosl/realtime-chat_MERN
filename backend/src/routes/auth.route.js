import express from "express"
import { login, logout, signup } from "../controllers/auth.controller.js"

const router = express.Router()

// all the routes logic can be found in auth.controller.js
router.post("/signup", signup)
router.post("/login", login)
router.post("/logout", logout)

export default router