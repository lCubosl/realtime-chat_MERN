import { generateToken } from "../lib/utils.js"
import User from "../models/user.model.js"
import bcrypt from "bcryptjs"

// signup route
export const signup = async (req, res) => {
  const { fullName, email, password } = req.body
  try {
    // every field is filled check
    if (!fullName || !email || !password) {
      return res.status(400).json({ message: "All the fields are required" })
    }
    
    if (password.length < 6) {
      return res.status(400).json({message: "Password must be at least 6 characters long"})
    }
    
    const user = await User.findOne({email})
    
    if (user) return res.status(400).json({message: "email already exists"})
      
    // password hashing to "encrypt passwords"
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

// login route
export const login = async (req, res) => {
  const { email, password } = req.body
  try {
    const user = await User.findOne({ email })

    if(!user) {
      return res.status(400).json({message:"Invalid user or password"})
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password)
    if(!isPasswordCorrect) {
      return res.status(400).json({message:"Invalid user or password"})
    }

    generateToken(user._id, res)

    res.status(200).json({
      _id:user._id,
      fullName: user.fullName,
      email: user.email,
      profilePic: user.profilePic,
    })
  } catch (error) {
    console.log("Error in login controller", error.message)
    res.status(500).json({ message: "Internal Server Error" })
  }
}

// logout route
export const logout = (req, res) => {
  try {
    res.cookie("jwt", "", {maxAge:0})
    res.status(200).json({ message: "Logged out successfully" })
  } catch (error) {
    console.log("Error in loggout controller", error.message)    
    res.status(500).json({ message: "Internal Server Error" })

  }
}