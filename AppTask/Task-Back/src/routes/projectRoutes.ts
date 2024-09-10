import { Router } from "express";
import { ProjectController } from "../controllers/ProjectController";
import { body, param } from "express-validator";
import { handleInputErorrs } from "../middleware/validation";
import { TaskController } from "../controllers/TaskController";
import { projectExist } from "../middleware/project";
import { taskBelongsToProject, taskExist } from "../middleware/task";

const router = Router()

//Todos los proyectos
router.get('/', ProjectController.getAllProjects)

//Proyecto por ID
router.get('/:id',
    param('id')
        .isMongoId().withMessage('Id no valido'),
    handleInputErorrs,
    ProjectController.getAllProjectById
)

//Creacion de projecto
router.post('/',
    body('projectName')
        .notEmpty().withMessage('Nombre del proyecto es obligatorio'),
    body('clientName')
        .notEmpty().withMessage('Nombre del cliente es obligatorio'),
    body('description')
        .notEmpty().withMessage('description del proyecto es obligatorio'),
    handleInputErorrs,
    ProjectController.createProject
)

//Actualizacion del projecto
router.put('/:id',
    param('id')
        .isMongoId().withMessage('Id no valido o no existente'),
    body('projectName')
        .notEmpty().withMessage('Nombre del proyecto es obligatorio'),
    body('clientName')
        .notEmpty().withMessage('Nombre del cliente es obligatorio'),
    body('description')
        .notEmpty().withMessage('description del proyecto es obligatorio'),
    handleInputErorrs,
    ProjectController.updateProjectById
)


//Eliminacion
router.delete('/:id',
    param('id')
        .isMongoId().withMessage('Id no valido o no existente'),
    handleInputErorrs,
    ProjectController.getDeleteProjectById
)


/** Routes for Task */

router.param('projectId', projectExist)

router.post('/:projectId/tasks',
    body('name')
        .notEmpty().withMessage('Nombre de la Tarea es obligatorio'),
    body('description')
        .notEmpty().withMessage('description de la Tarea es obligatorio'),
    handleInputErorrs,
    TaskController.createTask
)


router.get('/:projectId/tasks', 
    TaskController.getAllTaskProject
)

router.param('taskId', taskExist)
router.param('taskId', taskBelongsToProject)


router.get('/:projectId/tasks/:taskId', 
    param('taskId')
    .isMongoId().withMessage('Id no valido o no existente'),
    TaskController.getTaskProjectById
)

router.put('/:projectId/tasks/:taskId', 
    param('taskId')
    .isMongoId().withMessage('Id no valido o no existente'),
    body('name')
    .notEmpty().withMessage('Nombre de la Tarea es obligatorio'),
    body('description')
    .notEmpty().withMessage('description de la Tarea es obligatorio'),
    TaskController.updateTaskProjectById
)

router.delete('/:projectId/tasks/:taskId', 
    param('taskId')
    .isMongoId().withMessage('Id no valido o no existente'),
    TaskController.deleteTaskProjectById
)

router.post('/:projectId/tasks/:taskId/status',
    param('taskId')
    .isMongoId().withMessage('Id no valido o no existente'),
    body('status')
        .notEmpty().withMessage('el status es obligatorio'),
    TaskController.updateStatusTask
)


export default router