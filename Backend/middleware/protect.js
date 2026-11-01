import Jwt from "jsonwebtoken"
import User from "../models/user.model"

const protect = async (req, res, next) => {
    try {
        const token = req.cookies.token
        if (!token) {
            return res.status(404).json({ message: "Unauthorized" })
        }
        const decoded = Jwt.verify(token, process.env.JWT_SECRET)
        const user = await User.findById(decoded.userId)
        if (!user) {
            return res.status(404).json({ message: "User not found" })
        }


        req.userId = user
        next()
    } catch (error) {
        res.status(500).json({ message: `protect error: ${error.message}` })
    }
}

export default protect