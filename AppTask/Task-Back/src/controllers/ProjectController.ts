import type { Request, Response } from 'express'
import Project from '../models/Project'


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
        const { id } = req.params
        try {
            const project = await Project.findById(id).populate('tasks')
            if (!project) {
                const error = new Error('Proyecto no encontrado')
                return res.status(404).json({ error: error.message })
            }
            return res.json(project)

        } catch (error) {
            console.log(error)
        }
    }

    static createProject = async (req: Request, res: Response) => {
        const project = new Project(req.body)

        if (!project) {
            const error = new Error('Error al crear Proyecto')
            return res.status(404).json({ error: error.message })
        }
        
        try {
            await project.save()
            res.send('Projecto Creado correctamente')
        } catch (error) {
            console.log(error)
        }
    }



    static updateProjectById = async (req: Request, res: Response) => {
        const { id } = req.params

        try {
            const project = await Project.findById(id)
            if (!project) {
                const error = new Error('Proyecto no encontrado')
                return res.status(404).json({ error: error.message })
            }
            project.projectName = req.body.projectName
            project.clientName = req.body.clientName
            project.description= req.body.description
            await project.save()
            res.json('Projecto actualizado correctamente')
        } catch (error) {
            console.log(error)
        }
    }


    static getDeleteProjectById = async (req: Request, res: Response) => {
        const { id } = req.params
        try {
            await Project.findByIdAndDelete(id)
            return res.json('Projecto eliminado Exitosamente')
        } catch (error) {
            console.log(error)
        }
    }
}