import { generateToken } from "../lib/utils.js"
import User from "../models/user.model.js"
import bcrypt from "bcryptjs"

export const signup = async (req, res) => {
  const { fullName, email, password } = req.body
  try {
    // every field is filled check
    if (!fullName || !email || !password) {
      return res.status(400).json({ message: "All the fields are required" })
    }

    // password hashing to "encrypt passwords"
    if (password.length < 6) {
      return res.status(400).json({message: "Password must be at least 6 characters long"})
    }
    
    const user = await User.findOne({email})

    if (user) return res.status(400).json({message: "email already exists"})
    
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    const newUser = new User({
      fullName: fullName,
      email: email,
      password: hashedPassword
    })

    if (newUser) {
      // generate token
      generateToken(newUser._id, res)
      await newUser.save()

      res.status(201).json({
        id: newUser._id,
        fullName: newUser.email,
        ProfilePic: newUser.profilePic,
      })
    } else {
      res.status(400).json({ message: "Invalid user data" })
    }
  } catch (error) {
    console.log("Error in signup controller", error.message)
    res.status(500).json({ message: "Internal Server Error" })
  }
}

export const login = (req, res) => {
  res.send("login route")
}

export const logout = (req, res) => {
  res.send("logout route")
}