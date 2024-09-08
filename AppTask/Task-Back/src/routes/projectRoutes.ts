import { Router } from "express";
import { ProjectController } from "../controllers/ProjectController";
import { body, param } from "express-validator";
import { handleInputErorrs } from "../middleware/validation";

const router = Router()

router.get('/', 
    body('projectName')
        .isEmpty().withMessage('Nombre del proyecto es obligatorio'),
    body('clientName')
        .isEmpty().withMessage('Nombre del cliente es obligatorio'),    
    body('description')
        .isEmpty().withMessage('description del proyecto es obligatorio'),
    handleInputErorrs,
    ProjectController.getAllProjects
)

router.get('/:id', 
    param('_id')
        .isEmpty().withMessage('Nombre del proyecto es obligatorio'),
    handleInputErorrs,
    ProjectController.getAllProjectById
)

router.post('/', ProjectController.createProject)

export default router