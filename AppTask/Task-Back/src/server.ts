import express from "express";
import dotenv from "dotenv"
import { connectDB } from "./config/db";
import projectRoutes from './routes/projectRoutes'

//variables de entorno
dotenv.config()

//DB - connect
connectDB()

//Instance App
const app = express()

//Format JSON
app.use(express.json())

//Routes
app.use('/api/projects', projectRoutes)

export default app