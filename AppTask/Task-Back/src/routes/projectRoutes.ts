import { ProjectController } from "../controllers/ProjectController";
import { Router } from "express";
import { TaskController } from "../controllers/TaskController";
import { body, param } from "express-validator";
import { projectExist } from "../middleware/project";
import { hasAutorization, taskBelongsToProject, taskExist } from "../middleware/task";
import { TeamMemberController } from "../controllers/TeamController";
import { NoteController } from "../controllers/NoteController";
import { authenticate } from "../middleware/auth";
import { handleInputErorrs } from "../middleware/validation";

const router = Router()

router.use(authenticate)

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

/** Routes for Task */

router.param('projectId', projectExist)

//Actualizacion del projecto
router.put('/:projectId',
    param('projectId')
        .isMongoId().withMessage('Id no valido o no existente'),
    body('projectName')
        .notEmpty().withMessage('Nombre del proyecto es obligatorio'),
    body('clientName')
        .notEmpty().withMessage('Nombre del cliente es obligatorio'),
    body('description')
        .notEmpty().withMessage('description del proyecto es obligatorio'),
    handleInputErorrs,
    hasAutorization,
    ProjectController.updateProjectById
)


//Eliminacion
router.delete('/:projectId',
    param('projectId')
        .isMongoId().withMessage('Id no valido o no existente'),
    handleInputErorrs,
    hasAutorization,
    ProjectController.getDeleteProjectById
)




router.post('/:projectId/tasks',
    hasAutorization,
    body('name')
        .notEmpty().withMessage('Nombre de la Tarea es obligatorio'),
    body('description')
        .notEmpty().withMessage('description de la Tarea es obligatorio'),
    handleInputErorrs,
    hasAutorization,
    TaskController.createTask
)


router.get('/:projectId/tasks',
    TaskController.getAllTaskProject
)

router.param('taskId', taskExist)
router.param('taskId', taskBelongsToProject)


router.get('/:projectId/tasks/:taskId',
    param('taskId').isMongoId().withMessage('Id no válido o no existente'),
    taskExist,
    taskBelongsToProject,
    TaskController.getTaskProjectById
);


router.put('/:projectId/tasks/:taskId',
    param('taskId')
        .isMongoId().withMessage('Id no valido o no existente'),
    body('name')
        .notEmpty().withMessage('Nombre de la Tarea es obligatorio'),
    body('description')
        .notEmpty().withMessage('description de la Tarea es obligatorio'),
    hasAutorization,
    TaskController.updateTaskProjectById
)

router.delete('/:projectId/tasks/:taskId',
    param('taskId')
        .isMongoId().withMessage('Id no valido o no existente'),
    hasAutorization,
    TaskController.deleteTaskProjectById
)

router.put('/:projectId/tasks/:taskId/status',
    param('taskId')
        .isMongoId().withMessage('Id no valido o no existente'),
    body('status')
        .notEmpty().withMessage('el status es obligatorio'),
    TaskController.updateStatusTask
)

// Routes for teams

router.get('/:projectId/team', TeamMemberController.getMembersTeam)
router.delete('/:projectId/team/:userId',
    param('userId')
        .isMongoId().withMessage('ID No válido'),
    handleInputErorrs,
    TeamMemberController.removeMemberById)

router.post('/:projectId/team/find',
    body('email')
        .isEmail().toLowerCase().withMessage('Email no valido'),
    handleInputErorrs,
    TeamMemberController.findMemberByEmail
)

router.post('/:projectId/team',
    body('id')
        .isMongoId().withMessage('ID no valido'),
    handleInputErorrs,
    TeamMemberController.addMemberById
)

//Routes Notes

router.post('/:projectId/task/:taskId/notes',
    body('content')
        .notEmpty().withMessage('El contenido de la nota es obligatorio'),
    handleInputErorrs,
    NoteController.createNote
)

router.get('/:projectId/task/:taskId/notes', NoteController.getNoteById)

router.delete('/:projectId/task/:taskId/notes/:noteId',
    param('noteId').isMongoId().withMessage('ID no valido'),
    NoteController.deleteNote
)

export default router