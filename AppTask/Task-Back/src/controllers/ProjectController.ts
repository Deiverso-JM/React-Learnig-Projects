import type {Request, Response} from 'express'
import Project from '../models/project'


export class ProjectController {


    static getAllProjects = async (req: Request, res: Response) => {
        try {
            const projects = await Project.find({})
            res.json(projects)
        } catch (error) {
            console.log(error)
        }
    }

    static getAllProjectById = async (req: Request, res: Response) => {
        const _id = req.params
        console.log(req)
        try {

        } catch (error) {
            console.log(error)
        }
    }

    static createProject = async (req: Request, res: Response) => {
        const project = new Project(req.body)

        console.log(project)
        try {
            await project.save()
            res.send('Projecto Creado correctamente')
        } catch (error) {
            console.log(error)
        }
    }
}