import { transporter } from "../config/nodemailer"

interface IEmail {
    email: string;
    name: string;
    token: string;
}

export class AuthEmail {
    static sendConfirmationEmail = async (user: IEmail) => {
        await transporter.sendMail({
            from: 'UpTask <admin@uptask.com>',
            to: user.email,
            subject: 'UpTask Confirma tu cuenta',
            text: 'Confirma tu cuenta',
            html: `<p> Hola: ${user.name}, has creado tu cuenta en UpTask, Ya casi esta 
            todo listo solo debes confirmar tu cuenta </p>
                <p>Visita el siguiente enlace:</p>
                <a href='${process.env.FRONTEND}/auth/confirm-account'>Confirmar Cuenta</a>     
                <p>E Ingresa el codigo: <b>${user.token}</b></p>
                <p>Este token espira en 10 minutos</p>
                `
        })
    }


    static sendPasswordResetEmail = async (user: IEmail) => {
        await transporter.sendMail({
            from: 'UpTask <admin@uptask.com>',
            to: user.email,
            subject: 'UpTask - Restablecer Password',
            text: 'Restablece tu Password',
            html: `<p> Hola: ${user.name}, te hemos enviado este token, Ya casi esta 
            todo listo solo debes restablecer tu cuenta </p>
                <p>Visita el siguiente enlace:</p>
                <a href='${process.env.FRONTEND}/auth/new-password-token'>Restablecer Password</a>     
                <p>E Ingresa el codigo: <b>${user.token}</b></p>
                <p>Este token espira en 10 minutos</p>
                `
        })
    }
}