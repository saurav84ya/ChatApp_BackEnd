import express from "express"
import dotenv from "dotenv"
import mongoose from "mongoose"
import cookieParser from "cookie-parser"
import cors from "cors"

import { server, app } from "./socket/socket.js"

dotenv.config()

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Connected to MongoDB")
  })
  .catch((err) => {
    console.log(err)
  })


const PORT = process.env.PORT || 3000

app.use(cors({
  origin: ["https://chat-app-front-end-alpha.vercel.app", "http://localhost:5175"],
  credentials: true, 
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
}));

app.options('*', cors()); // Enable pre-flight requests for all routes


app.options('*', cors()); // Enable pre-flight requests for all routes

app.use(express.json())
app.use(cookieParser())

// Health check endpoint
app.get("/", (req, res) => {
  res.send("Hello World")
})

// Endpoint to check if the server is running
app.get("/health", (req, res) => {
  res.json({ message: "Server is running" });
});

import authRoutes from "./routes/auth.routes.js"
import messageRoute from "./routes/message.routes.js"
import userRoute from "./routes/user.routes.js"

app.use("/api/auth", authRoutes)
app.use("/api/messages", messageRoute)
app.use("/api/users", userRoute)

server.listen(PORT, () => {
  console.log("Server is running on port " + PORT)
})

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500
  const message = err.message || "Internal Server Error"

  return res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  })
})
