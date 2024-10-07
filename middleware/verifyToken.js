import { errorHandler } from "../utils/error.js"
import jwt from "jsonwebtoken"

export const isAuthenticate = async (req, res, next) => {
  // console.log("hiii")
  try {
    // console.log("enter")
    const token = req.header("Authorization")
    console.log("token " , token)

    if (!token) {
      return next(errorHandler(401, "Unauthorized"))
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
      if (err) {
        return next(errorHandler(403, "Forbidden"))
      }

      req.user = user

      next()
    })
  } catch (error) {
    // console.log(" not enter")
    next(error)
  }
}
