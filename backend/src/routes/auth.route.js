import express from "express"
import { checkAuth, login, logout, signup, updateProfile } from "../controllers/auth.controller.js"
import { protectRoute } from "../middleware/auth.middleware.js"

const router = express.Router()

// all the routes logic can be found in auth.controller.js
router.post("/signup", signup)
router.post("/login", login)
router.post("/logout", logout)

// after login. route for updating profile picture
router.put("/update-profile", protectRoute, updateProfile)

router.get("/check", protectRoute, checkAuth)

export default router