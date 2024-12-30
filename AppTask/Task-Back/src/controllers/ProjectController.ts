import type { Request, Response } from 'express'
import Project from '../models/project'

export class ProjectController {


    static getAllProjects = async (req: Request, res: Response) => {
        try {
            const projects = await Project.find({
                $or: [
                    { manager: { $in: req.user.id } },
                    { team: { $in: req.user.id } }
                ],

            })
            res.json(projects)
        } catch (error) {
            res.status(500).json({ error: 'hubo un error' })
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

            if (project.manager.toString() !== req.user.id.toString() && !project.team.includes(req.user.id)) {
                const error = new Error('Accion no valida')
                return res.status(404).json({ error: error.message })
            }
            return res.json(project)

        } catch (error) {
            res.status(500).json({ error: 'hubo un error' })
        }
    }

    static createProject = async (req: Request, res: Response) => {
        const project = new Project(req.body)

        project.manager = req.user.id

        if (!project) {
            const error = new Error('Error al crear Proyecto')
            return res.status(404).json({ error: error.message })
        }

        try {
            await project.save()
            res.send('Projecto Creado correctamente')
        } catch (error) {
            res.status(500).json({ error: 'hubo un error' })
        }
    }



    static updateProjectById = async (req: Request, res: Response) => {

        try {
            req.project.projectName = req.body.projectName
            req.project.clientName = req.body.clientName
            req.project.description = req.body.description
            await req.project.save()
            res.json('Projecto actualizado correctamente')
        } catch (error) {
            res.status(500).json({ error: 'hubo un error' })
        }
    }


    static getDeleteProjectById = async (req: Request, res: Response) => {

        try {
            await req.project.deleteOne()
            return res.json('Projecto eliminado Exitosamente')
        } catch (error) {
            res.status(500).json({ error: 'hubo un error' })
        }
    }
}