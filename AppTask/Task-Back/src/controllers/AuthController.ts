import Token from "../models/Token"
import User from "../models/User"
import { type Request, type Response } from "express"
import { generateToken } from "../utils/token"
import { checkPassword, hashPassword } from '../utils/auth'
import { AuthEmail } from "../emails/AuthEmail"
import { generateJWT } from "../utils/jwt"

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
            throw new Error('No se pudo crear la cuenta')
        }
    }

    static confirmAccount = async (req: Request, res: Response) => {
        try {
            const { token } = req.body
            const tokenExist = await Token.findOne({ token })

            if (!tokenExist) {
                const error = new Error('Token no valido ')
                return res.status(404).json({ error: error.message })
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
                return res.status(406).json({ error: error.message })
            }

            const token = generateJWT({ id: user.id })

            res.send(token)

        } catch (error) {
            res.status(500).json({ error: 'Hubo un error' })
        }
    }


    static requestConfirmationCode = async (req: Request, res: Response) => {
        try {
            const { email } = req.body

            //Prevenir duplicados
            const userExist = await User.findOne({ email })

            if (!userExist) {
                const error = new Error('El usuario no esta registrado')
                return res.status(404).json({ error: error.message })
            }

            if (userExist.confirmed) {
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
            throw new Error('No se pudo crear la cuenta')
        }
    }


    static forgotPassword = async (req: Request, res: Response) => {
        try {
            const { email } = req.body

            const userExist = await User.findOne({ email })
            if (!userExist) {
                const error = new Error('El usuario no esta registrado')
                return res.status(404).json({ error: error.message })
            }

            //Generate token
            const token = new Token()
            token.token = generateToken()
            token.user = userExist.id
            await token.save()

            // Enviar Email 
            AuthEmail.sendPasswordResetEmail({
                email: email,
                name: userExist.name,
                token: token.token
            })
            res.send('Revisa tu email para nuevas instruciones ')
        } catch (error) {
            throw new Error('No se pudo restablecer el password')
        }
    }


    static validateToken = async (req: Request, res: Response) => {
        try {
            const { token } = req.body
            const tokenExist = await Token.findOne({ token })
            if (!tokenExist) {
                const error = new Error('Token no valido ')
                return res.status(404).json({ error: error.message })
            }
            res.send('Token Validado, define tu nuevo password')
        } catch (error) {
            throw new Error('No se pudo crear la cuenta')
        }
    }

    static updatePasswordWithToken = async (req: Request, res: Response) => {
        try {
            const { token } = req.params
            const { password } = req.body
            const tokenExist = await Token.findOne({ token })

            if (!tokenExist) {
                const error = new Error('Token no valido ')
                return res.status(404).json({ error: error.message })
            }

            const user = await User.findById(tokenExist.user)
            user.password = await hashPassword(password)

            await Promise.allSettled([user.save(), tokenExist.deleteOne()])
            res.send('Password restablecido exitosamente')
        } catch (error) {
            throw new Error('No se pudo crear la cuenta')
        }
    }


    static user = async (req: Request, res: Response) => res.json(req.user)

    static updateProfile = async (req: Request, res: Response) => {
        const { name, email } = req.body

        const userExist = await User.findOne({ email });
        if (userExist && userExist.id.toString() !== req.user.id.toString()) {
            const error = new Error('Ese email ya esta registrado')
            return res.status(404).json({ error: error.message })
        }
        userExist.name = name
        userExist.email = email

        try {
            await userExist.save()
            res.send('Perfil actualizado Correctamente')
        } catch (error) {
            throw new Error('Hubo un error')

        }

    }

    static updateCurrentUserPassword = async (req: Request, res: Response) => {
        const { current_password, password } = req.body
        const user = await User.findById(req.user.id);
        const isPassword = await checkPassword(current_password, user.password)

        if (!isPassword) {
            const error = new Error('El password actual es incorrecto')
            return res.status(404).json({ error: error.message })
        }
        user.password = await hashPassword(password)
        try {
            await user.save()
            res.send('Password actualizado correctamente')
        } catch (error) {
            throw new Error('Hubo un error')

        }

    }

    static checkPassword = async (req: Request, res: Response) => {
        const { password } = req.body
        const user = await User.findById(req.user.id);
        const isPassword = await checkPassword(password, user.password)

        if (!isPassword) {
            const error = new Error('El password es incorrecto')
            return res.status(404).json({ error: error.message })
        }
        res.send('Password Correcto')
    }

}