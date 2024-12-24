import Token from "../models/Token"
import User from "../models/User"
import { response, type Request, type Response } from "express"
import { generateToken } from "../utils/token"
import { checkPassword, hashPassword } from '../utils/auth'
import { AuthEmail } from "../emails/AuthEmail"

export class AuthController {
    static createAccount = async (req: Request, res: Response) => {
        try {
            const { password, email } = req.body

            //Prevenir duplicados
            const userExist = await User.findOne({ email })
            if (userExist) {
                const error = new Error('Usuario ya registrado')
                return res.status(409).json({ error: error.message })
            }
            const user = new User(req.body)

            //hashPassword
            user.password = await hashPassword(password)

            //Generate token
            const token = new Token()
            token.token = generateToken()
            token.user = user.id

            // Enviar Email 
            AuthEmail.sendConfirmationEmail({
                email: email,
                name: user.name,
                token: token.token

            })
            await Promise.allSettled([token.save(), user.save()])
            res.send('Cuenta creada, revisa tu email para confirmarla ')
        } catch (error) {
            console.log(error)
            throw new Error('No se pudo crear la cuenta')
        }
    }

    //Revisar que no esta mandando el mensaje
    static confirmAccount = async (req: Request, res: Response) => {
        try {
            const { token } = req.body
            const tokenExist = await Token.findOne({ token })

            if (!tokenExist) {
                const error = new Error('Token no valido ')
                return res.status(404).json({ error: error })
            }

            const user = await User.findById(tokenExist.user)
            if (!user) {
                const error = new Error('Usuario no encontrado')
                return res.status(404).json({ error: error.message })
            }

            user.confirmed = true
            await Promise.allSettled([user.save(), tokenExist.deleteOne()])
            res.send('Cuenta confirmada correctamente')

        } catch (error) {
            console.log(error)
            throw new Error('No se pudo crear la cuenta')
        }
    }

    static loginAccount = async (req: Request, res: Response) => {
        try {
            const { email, password } = req.body
            const user = await User.findOne({ email })

            if (!user) {
                const error = new Error('Usuario no encontrado')
                return res.status(404).json({ error: error.message })
            }

            if (!user.confirmed) {
                const token = new Token()
                token.user = user.id
                token.token = generateToken()

                AuthEmail.sendConfirmationEmail({
                    email: user.email,
                    name: user.name,
                    token: token.token
                })

                const error = new Error('La cuenta no esta confirmada, hemos enviado un email de confirmarcion')
                return res.status(404).json({ error: error.message })
            }

            //Revisar Password
            const isPassword = await checkPassword(password, user.password)
            if (!isPassword) {
                const error = new Error('El password es incorrecto, vuelve a intentar')
                return res.status(202).json({ error: error.message })
            }


            res.send('Cuenta confirmada correctamente')

        } catch (error) {
            res.status(500).json({ error: 'Hubo un error' })
        }
    }


    static requestConfirmationCode = async (req: Request, res: Response) => {
        try {
            const {email } = req.body

            //Prevenir duplicados
            const userExist = await User.findOne({ email })
            
            if (!userExist) {
                const error = new Error('El usuario no esta registrado')
                return res.status(404).json({ error: error.message })
            }

            if(userExist.confirmed){
                const error = new Error('El usuario ya esta confirmado')
                return res.status(403).json({ error: error.message })
            }

            //Generate token
            const token = new Token()
            token.token = generateToken()
            token.user = userExist.id

            // Enviar Email 
            AuthEmail.sendConfirmationEmail({
                email: email,
                name: userExist.name,
                token: token.token

            })
            await Promise.allSettled([token.save(), userExist.save()])
            res.send('Se envio un nuevo token a tu email ')
        } catch (error) {
            console.log(error)
            throw new Error('No se pudo crear la cuenta')
        }
    }
}