import authRoutes from './routes/authRoutes';
import cors from 'cors'
import dotenv from "dotenv"
import express from "express";
import projectRoutes from './routes/projectRoutes'
import { connectDB } from "./config/db";
import { corsConfig } from "./config/cors";


//variables de entorno
dotenv.config()

//DB - connect
connectDB()

//Instance App
const app = express()

//Cors
app.use(cors(corsConfig))

//Format JSON
app.use(express.json())

//Routes
app.use('/api/projects', projectRoutes)
app.use('/api/auth', authRoutes)


export default app

