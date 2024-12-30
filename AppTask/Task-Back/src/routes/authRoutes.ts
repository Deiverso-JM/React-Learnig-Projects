import { Router } from "express";
import { AuthController } from "../controllers/AuthController";
import { body, param } from "express-validator";
import { authenticate } from "../middleware/auth";
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

router.post('/forgot-password',
    body('email')
        .isEmail().withMessage('El email no es valido'),
    handleInputErorrs,
    AuthController.forgotPassword
)


router.post('/validate-token',
    body('token')
        .notEmpty().withMessage('El Token no puede ir vacio'),
    handleInputErorrs,
    AuthController.validateToken
)

router.post('/update-password/:token',
    param('token').isNumeric().withMessage('Token no valido'),
    body('password')
        .isLength({ min: 8 }).withMessage('El password debe ser de minimo 8 caracteres'),
    body('password_confirmation').custom((value, { req }) => {
        if (value !== req.body.password) throw new Error('Los password no son iguales')
        return true
    }),
    handleInputErorrs,
    AuthController.updatePasswordWithToken
)

router.get('/user',
    authenticate,
    AuthController.user
)


//Profile

router.put('/profile',
    authenticate,
    body('name')
        .notEmpty().withMessage('El nombre no puede ir vacio'),
    body('email')
        .isEmail().withMessage('El email no es valido'),
    AuthController.updateProfile
)

router.post('/update-password',
    authenticate,
    body('current_password')
        .isEmail().withMessage('El password actual no coincide'),
    body('password')
        .isLength({ min: 8 }).withMessage('El password debe ser de minimo 8 caracteres'),
    body('password_confirmation').custom((value, { req }) => {
        if (value !== req.body.password) throw new Error('Los password no son iguales')
        return true
    }),
    AuthController.updateCurrentUserPassword
)


router.post('/check-password', 
    authenticate,
    body('current_password')
        .isEmail().withMessage('El password actual no coincide'),
    AuthController.checkPassword
)


export default router