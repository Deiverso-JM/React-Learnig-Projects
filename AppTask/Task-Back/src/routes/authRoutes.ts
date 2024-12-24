import { Router } from "express";
import { AuthController } from "../controllers/AuthController";
import { body } from "express-validator";
import { handleInputErorrs } from "../middleware/validation";

const router = Router()

router.get('/',)

router.post('/create-account',
    body('name')
        .notEmpty().withMessage('El nombre no puede ir vacio'),
    body('password')
        .isLength({ min: 8 }).withMessage('El password debe ser de minimo 8 caracteres'),
    body('password_confirmation').custom((value, { req }) => {
        if (value !== req.body.password) throw new Error('Los password no son iguales')
        return true
    }),
    body('email')
        .isEmail().withMessage('El email no es valido'),
    handleInputErorrs,
    AuthController.createAccount
)

router.post('/confirm-account', 
    body('token')
        .notEmpty().withMessage('El Token no puede ir vacio'),
    handleInputErorrs,
    AuthController.confirmAccount
)

router.post('/login', 
    body('email')
        .isEmail().withMessage('El email no es valido'),
    body('password')
        .notEmpty().withMessage('El password muy corto,  debe ser de minimo 8 caracteres'),
    handleInputErorrs,
    AuthController.loginAccount
)

router.post('/request-code', 
    body('email')
        .isEmail().withMessage('El email no es valido'),
    handleInputErorrs,
    AuthController.requestConfirmationCode
)



export default router