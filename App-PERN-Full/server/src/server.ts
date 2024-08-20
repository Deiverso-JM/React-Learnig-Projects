import express from "express";
import router from "./router";
import db from "./config/db";
import swagggerUi, { serve } from 'swagger-ui-express'
import swaggerSpec from "./config/swagger";
import cors, { CorsOptions } from "cors";
import morgan from "morgan";


async function connectDB() {
    try {
        await db.authenticate()
        db.sync()


    } catch (error) {
        console.log(error)
        throw new Error('No se pudo conectar la DB')

    }
}

connectDB()

//Instancia de express
const server = express()

//Cors
const corsOptions: CorsOptions = {
    origin: function (origin, callback) {
        if (origin === `${process.env.FRONTEND_URL}`) {
            callback(null, true)
        } else {
            callback(new Error('ERROR CORS'))
        }
    }
}

server.use(cors(corsOptions))


//Leer Datos de formulario
server.use(express.json())

server.use(morgan('dev'))

//Router
server.use('/api/products', router)

//Docs
server.use('/docs', swagggerUi.serve, swagggerUi.setup(swaggerSpec))
export default server