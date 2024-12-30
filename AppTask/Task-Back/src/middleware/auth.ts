import { NextFunction, Response, Request } from "express";
import Jwt from "jsonwebtoken";
import User, { IUSer } from "../models/User";

declare global {
    namespace Express {
        interface Request {
            user?: IUSer
        }
    }
}

export const authenticate = async (req: Request, res: Response, next: NextFunction) => {
    const bearer = req.headers.authorization
    if (!bearer) {
        const error = new Error('No autorizado')
        return res.status(401).json({ error: error.message })
    }
    const token = bearer.split(' ')[1]
    const decoded = Jwt.verify(token, process.env.JWT_SECRET)
    try {
        if (typeof decoded === 'object' && decoded.id) {
            const user = await User.findById(decoded.id).select('_id name email')
            if (user) {
                req.user = user
                next()
            } else {
                res.status(500).json({ error: 'Error en la accion, token  no valido' })
            }
        }
    } catch (error) {
        res.status(500).json({ error: 'Token no valido' })
    }
}